import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DateTime } from "luxon";
import {
	LuActivity,
	LuArrowDown,
	LuArrowUp,
	LuCalendarDays,
	LuHeartHandshake,
	LuMailbox,
	LuTicket,
	LuUsers,
} from "react-icons/lu";

import { auth } from "@/lib/auth";
import connectMongo from "@/lib/connectDB";
import { getUserByEmail } from "@/lib/get-user-by-email";
import { hasPermission, normalizeUserAccess } from "@/lib/permissions";
import DonationModel from "@/models/donation";
import DonorModel from "@/models/donor";
import EventRegistrationModel from "@/models/event-registration";
import MessageModel from "@/models/message";
import ProgramModel from "@/models/program";
import UserModel from "@/models/user";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Dashboard",
};

const SPARKLINE_DAYS = 30;

/** Tailwind needs literal class names; map "accent" prop to fixed classes so JIT can pick them up. */
const ACCENT_CLASSES = {
	primary: "bg-primary/10 text-primary",
	secondary: "bg-secondary/10 text-secondary",
	accent: "bg-accent/10 text-accent",
	info: "bg-info/10 text-info",
	warning: "bg-warning/10 text-warning",
	success: "bg-success/10 text-success",
};

const gbpFormatter = new Intl.NumberFormat("en-GB", {
	style: "currency",
	currency: "GBP",
	maximumFractionDigits: 0,
});

const gbpDetailedFormatter = new Intl.NumberFormat("en-GB", {
	style: "currency",
	currency: "GBP",
});

function formatGBP(amount, { detailed = false } = {}) {
	const value = Number(amount ?? 0);
	return detailed
		? gbpDetailedFormatter.format(value)
		: gbpFormatter.format(value);
}

function deltaPercent(curr, prev) {
	if (!prev) return curr ? 100 : 0;
	return ((curr - prev) / prev) * 100;
}

async function loadDonationStats() {
	const now = DateTime.utc();
	const startOfMonth = now.startOf("month").toJSDate();
	const startOfPrevMonth = now
		.minus({ months: 1 })
		.startOf("month")
		.toJSDate();
	const sparkStart = now
		.minus({ days: SPARKLINE_DAYS - 1 })
		.startOf("day")
		.toJSDate();

	const [
		allTimeAgg,
		thisMonthAgg,
		prevMonthAgg,
		donorCount,
		recurringCount,
		recentDonations,
		dailyAgg,
		designationAgg,
	] = await Promise.all([
		DonationModel.aggregate([
			{ $match: { status: "completed" } },
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" },
					count: { $sum: 1 },
				},
			},
		]),
		DonationModel.aggregate([
			{
				$match: {
					status: "completed",
					createdAt: { $gte: startOfMonth },
				},
			},
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" },
					count: { $sum: 1 },
				},
			},
		]),
		DonationModel.aggregate([
			{
				$match: {
					status: "completed",
					createdAt: { $gte: startOfPrevMonth, $lt: startOfMonth },
				},
			},
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" },
					count: { $sum: 1 },
				},
			},
		]),
		DonorModel.countDocuments({}),
		DonationModel.countDocuments({
			status: "completed",
			recurring: true,
		}),
		DonationModel.find({ status: "completed" })
			.sort({ createdAt: -1 })
			.limit(5)
			.lean(),
		DonationModel.aggregate([
			{
				$match: {
					status: "completed",
					createdAt: { $gte: sparkStart },
				},
			},
			{
				$group: {
					_id: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: "$createdAt",
						},
					},
					total: { $sum: "$amount" },
					count: { $sum: 1 },
				},
			},
			{ $sort: { _id: 1 } },
		]),
		DonationModel.aggregate([
			{ $match: { status: "completed" } },
			{
				$group: {
					_id: "$designation",
					total: { $sum: "$amount" },
					count: { $sum: 1 },
				},
			},
			{ $sort: { total: -1 } },
		]),
	]);

	const dailyMap = new Map(dailyAgg.map((d) => [d._id, d]));
	const series = Array.from({ length: SPARKLINE_DAYS }).map((_, i) => {
		const day = now
			.minus({ days: SPARKLINE_DAYS - 1 - i })
			.toFormat("yyyy-LL-dd");
		const found = dailyMap.get(day);
		return {
			day,
			total: found?.total ?? 0,
			count: found?.count ?? 0,
		};
	});

	const designationTotal = designationAgg.reduce(
		(acc, d) => acc + (d.total ?? 0),
		0,
	);

	return {
		allTime: {
			total: allTimeAgg[0]?.total ?? 0,
			count: allTimeAgg[0]?.count ?? 0,
		},
		thisMonth: {
			total: thisMonthAgg[0]?.total ?? 0,
			count: thisMonthAgg[0]?.count ?? 0,
		},
		prevMonth: {
			total: prevMonthAgg[0]?.total ?? 0,
			count: prevMonthAgg[0]?.count ?? 0,
		},
		donorCount,
		recurringCount,
		recentDonations,
		series,
		designationBreakdown: designationAgg,
		designationTotal,
	};
}

async function loadProgramStats() {
	const today = DateTime.utc().startOf("day").toJSDate();

	const [
		upcomingPrograms,
		totalPrograms,
		publishedCount,
		registrationCount,
		regByProgramAgg,
	] = await Promise.all([
		ProgramModel.find({
			status: "publish",
			$or: [
				{ end_date: { $gte: today } },
				{ end_date: null, start_date: { $gte: today } },
			],
		})
			.sort({ start_date: 1 })
			.limit(5)
			.lean(),
		ProgramModel.countDocuments({}),
		ProgramModel.countDocuments({ status: "publish" }),
		EventRegistrationModel.countDocuments({ status: "confirmed" }),
		EventRegistrationModel.aggregate([
			{ $match: { status: "confirmed" } },
			{
				$group: {
					_id: "$program",
					count: { $sum: 1 },
					checkedIn: {
						$sum: {
							$cond: [
								{ $ifNull: ["$checkedInAt", false] },
								1,
								0,
							],
						},
					},
				},
			},
		]),
	]);

	const regByProgram = new Map(
		regByProgramAgg.map((r) => [String(r._id), r]),
	);

	return {
		upcomingPrograms: upcomingPrograms.map((p) => {
			const stats = regByProgram.get(String(p._id));
			return {
				...p,
				registrations: stats?.count ?? 0,
				checkedIn: stats?.checkedIn ?? 0,
			};
		}),
		totalPrograms,
		publishedCount,
		registrationCount,
	};
}

async function loadMessageStats() {
	const [unreadCount, totalCount, recent] = await Promise.all([
		MessageModel.countDocuments({ read: false }),
		MessageModel.countDocuments({}),
		MessageModel.find({}).sort({ created_at: -1 }).limit(5).lean(),
	]);
	return { unreadCount, totalCount, recent };
}

async function loadTeamStats() {
	const [count, owners] = await Promise.all([
		UserModel.countDocuments({}),
		UserModel.countDocuments({
			$or: [{ role: "owner" }, { account_type: "admin" }],
		}),
	]);
	return { count, owners };
}

function KpiCard({ icon: Icon, label, value, sub, accent = "primary" }) {
	const accentClass = ACCENT_CLASSES[accent] ?? ACCENT_CLASSES.primary;
	return (
		<div className="rounded-2xl bg-base-100 border border-base-300/60 p-5 shadow-sm">
			<div className="flex items-center justify-between gap-2">
				<span className="text-xs font-medium uppercase tracking-wider text-neutral/60">
					{label}
				</span>
				{Icon ? (
					<span
						className={`grid place-items-center w-8 h-8 rounded-full ${accentClass}`}>
						<Icon className="w-4 h-4" />
					</span>
				) : null}
			</div>
			<div className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
				{value}
			</div>
			{sub ? (
				<div className="mt-1 text-xs text-neutral/60">{sub}</div>
			) : null}
		</div>
	);
}

function DeltaBadge({ percent }) {
	const positive = percent >= 0;
	const Icon = positive ? LuArrowUp : LuArrowDown;
	return (
		<span
			className={`inline-flex items-center gap-1 text-xs font-medium ${
				positive ? "text-success" : "text-error"
			}`}>
			<Icon className="w-3 h-3" />
			{Math.abs(percent).toFixed(1)}%
		</span>
	);
}

async function AdminDashboardPage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user) redirect("/login");

	await connectMongo();
	const fullUser = await getUserByEmail(session.user.email);
	const access = normalizeUserAccess(fullUser);

	const showDonations = hasPermission(access, "donations");
	const showEvents = hasPermission(access, "events");
	const showMessages = hasPermission(access, "messages");
	const showTeam = hasPermission(access, "team");

	const [donations, programs, messages, team] = await Promise.all([
		showDonations ? loadDonationStats() : null,
		showEvents ? loadProgramStats() : null,
		showMessages ? loadMessageStats() : null,
		showTeam ? loadTeamStats() : null,
	]);

	const today = DateTime.now().toFormat("EEEE, dd LLLL yyyy");
	const firstName = (fullUser?.name || session.user.name || "")
		.trim()
		.split(/\s+/)[0];

	const monthDelta = donations
		? deltaPercent(donations.thisMonth.total, donations.prevMonth.total)
		: 0;
	const sparkMax = donations
		? Math.max(1, ...donations.series.map((s) => s.total))
		: 1;

	const hasAnyAccess =
		showDonations || showEvents || showMessages || showTeam;

	return (
		<div className="space-y-8">
			<header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold">
						Welcome back{firstName ? `, ${firstName}` : ""}
					</h1>
					<p className="text-sm text-neutral/70">{today}</p>
				</div>
				<div className="badge badge-outline">
					{access.role === "owner" ? "Owner" : "Staff"}
				</div>
			</header>

			{hasAnyAccess ? (
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{showDonations ? (
						<>
							<KpiCard
								icon={LuHeartHandshake}
								label="Raised this month"
								value={formatGBP(donations.thisMonth.total)}
								sub={
									<span className="inline-flex items-center gap-2">
										<DeltaBadge percent={monthDelta} />
										<span>vs last month</span>
									</span>
								}
								accent="primary"
							/>
							<KpiCard
								icon={LuActivity}
								label="All-time raised"
								value={formatGBP(donations.allTime.total)}
								sub={`${donations.allTime.count} completed donations`}
								accent="secondary"
							/>
							<KpiCard
								icon={LuUsers}
								label="Donors"
								value={donations.donorCount.toLocaleString()}
								sub={`${donations.recurringCount} recurring gifts`}
								accent="info"
							/>
						</>
					) : null}
					{showEvents ? (
						<>
							<KpiCard
								icon={LuCalendarDays}
								label="Programs published"
								value={programs.publishedCount}
								sub={`${programs.totalPrograms} total in system`}
								accent="accent"
							/>
							<KpiCard
								icon={LuTicket}
								label="Confirmed registrations"
								value={programs.registrationCount.toLocaleString()}
								sub="Across all events"
								accent="primary"
							/>
						</>
					) : null}
					{showMessages ? (
						<KpiCard
							icon={LuMailbox}
							label="Unread messages"
							value={messages.unreadCount}
							sub={`${messages.totalCount} total received`}
							accent="warning"
						/>
					) : null}
					{showTeam ? (
						<KpiCard
							icon={LuUsers}
							label="Team members"
							value={team.count}
							sub={`${team.owners} with owner access`}
							accent="info"
						/>
					) : null}
				</section>
			) : null}

			{showDonations ? (
				<section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<div className="lg:col-span-2 rounded-2xl bg-base-100 border border-base-300/60 p-5">
						<div className="flex items-center justify-between mb-4">
							<div>
								<h2 className="text-base font-semibold">
									Donations — last {SPARKLINE_DAYS} days
								</h2>
								<p className="text-xs text-neutral/60">
									Daily totals, completed only
								</p>
							</div>
							<Link
								href="/admin/donations"
								className="btn btn-xs btn-ghost">
								View all
							</Link>
						</div>
						<div className="flex items-end gap-1 h-40">
							{donations.series.map((s) => {
								const heightPct = (s.total / sparkMax) * 100;
								const minPct = s.total > 0 ? 4 : 2;
								return (
									<div
										key={s.day}
										className="flex-1 group relative flex flex-col justify-end"
										title={`${DateTime.fromISO(
											s.day,
										).toFormat(
											"dd LLL",
										)}: ${formatGBP(s.total, { detailed: true })} (${
											s.count
										})`}>
										<div
											className={`w-full rounded-t-md transition-opacity opacity-80 group-hover:opacity-100 ${
												s.total > 0
													? "bg-primary"
													: "bg-base-300/60"
											}`}
											style={{
												height: `${Math.max(heightPct, minPct)}%`,
											}}
										/>
									</div>
								);
							})}
						</div>
						<div className="flex justify-between text-[10px] text-neutral/50 mt-2">
							<span>
								{DateTime.fromISO(
									donations.series[0].day,
								).toFormat("dd LLL")}
							</span>
							<span>Today</span>
						</div>
					</div>

					<div className="rounded-2xl bg-base-100 border border-base-300/60 p-5">
						<h2 className="text-base font-semibold mb-1">
							By designation
						</h2>
						<p className="text-xs text-neutral/60 mb-4">
							Share of all-time raised
						</p>
						<ul className="space-y-3">
							{donations.designationBreakdown.length ? (
								donations.designationBreakdown
									.slice(0, 6)
									.map((d) => {
										const pct = donations.designationTotal
											? (d.total /
													donations.designationTotal) *
												100
											: 0;
										return (
											<li key={d._id}>
												<div className="flex items-center justify-between text-xs mb-1 gap-2">
													<span className="truncate">
														{d._id}
													</span>
													<span className="font-mono whitespace-nowrap">
														{formatGBP(d.total)}
													</span>
												</div>
												<div className="h-2 rounded-full bg-base-200 overflow-hidden">
													<div
														className="h-full bg-primary"
														style={{
															width: `${pct}%`,
														}}
													/>
												</div>
											</li>
										);
									})
							) : (
								<li className="text-sm text-neutral/60">
									No completed donations yet.
								</li>
							)}
						</ul>
					</div>
				</section>
			) : null}

			<section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{showDonations ? (
					<div className="rounded-2xl bg-base-100 border border-base-300/60 p-5">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-base font-semibold">
								Recent donations
							</h2>
							<Link
								href="/admin/donations"
								className="btn btn-xs btn-ghost">
								View all
							</Link>
						</div>
						<ul className="divide-y divide-base-300/50">
							{donations.recentDonations.length ? (
								donations.recentDonations.map((d) => (
									<li
										key={String(d._id)}
										className="py-2 flex items-center justify-between gap-3">
										<div className="min-w-0">
											<div className="font-medium truncate">
												{d.donorName || "Anonymous"}
											</div>
											<div className="text-xs text-neutral/60 truncate">
												{d.designation}
												{d.recurring
													? " · monthly"
													: ""}
											</div>
										</div>
										<div className="text-right whitespace-nowrap">
											<div className="font-mono text-sm">
												{formatGBP(d.amount, {
													detailed: true,
												})}
											</div>
											<div className="text-[10px] text-neutral/60">
												{DateTime.fromJSDate(
													d.createdAt,
												).toRelative()}
											</div>
										</div>
									</li>
								))
							) : (
								<li className="py-4 text-sm text-neutral/60 text-center">
									No completed donations yet.
								</li>
							)}
						</ul>
					</div>
				) : null}

				{showEvents ? (
					<div className="rounded-2xl bg-base-100 border border-base-300/60 p-5">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-base font-semibold">
								Upcoming programs
							</h2>
							<Link
								href="/admin/programs"
								className="btn btn-xs btn-ghost">
								View all
							</Link>
						</div>
						<ul className="divide-y divide-base-300/50">
							{programs.upcomingPrograms.length ? (
								programs.upcomingPrograms.map((p) => {
									const seatsLeft = p.attendee_limit
										? Math.max(
												0,
												p.attendee_limit -
													p.registrations,
											)
										: null;
									return (
										<li
											key={String(p._id)}
											className="py-2 flex items-center justify-between gap-3">
											<div className="min-w-0">
												<Link
													href={`/admin/programs/${p._id}`}
													className="font-medium hover:underline truncate block">
													{p.title}
												</Link>
												<div className="text-xs text-neutral/60 truncate">
													{p.start_date
														? DateTime.fromJSDate(
																p.start_date,
															).toFormat(
																"dd LLL yyyy",
															)
														: "Date TBC"}
													{p.location
														? ` · ${p.location}`
														: ""}
												</div>
											</div>
											<div className="text-right text-xs whitespace-nowrap">
												<div>
													{p.registrations}
													{p.attendee_limit
														? `/${p.attendee_limit}`
														: ""}{" "}
													signed up
												</div>
												<div className="text-neutral/60">
													{p.checkedIn} checked-in
													{seatsLeft !== null
														? ` · ${seatsLeft} left`
														: ""}
												</div>
											</div>
										</li>
									);
								})
							) : (
								<li className="py-4 text-sm text-neutral/60 text-center">
									No upcoming published programs.
								</li>
							)}
						</ul>
					</div>
				) : null}

				{showMessages ? (
					<div className="rounded-2xl bg-base-100 border border-base-300/60 p-5">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-base font-semibold">
								Latest messages
							</h2>
							<Link
								href="/admin/messages"
								className="btn btn-xs btn-ghost">
								View all
							</Link>
						</div>
						<ul className="divide-y divide-base-300/50">
							{messages.recent.length ? (
								messages.recent.map((m) => (
									<li
										key={String(m._id)}
										className="py-2 flex items-start justify-between gap-3">
										<div className="min-w-0 flex-1">
											<div className="flex items-center gap-2">
												<span className="font-medium truncate">
													{m.name}
												</span>
												{!m.read ? (
													<span className="badge badge-warning badge-xs">
														new
													</span>
												) : null}
											</div>
											<div className="text-xs text-neutral/60 truncate">
												{m.email}
											</div>
											<div className="text-xs text-neutral/70 line-clamp-1 mt-0.5">
												{m.message}
											</div>
										</div>
										<span className="text-[10px] text-neutral/60 whitespace-nowrap">
											{DateTime.fromJSDate(
												m.created_at,
											).toRelative()}
										</span>
									</li>
								))
							) : (
								<li className="py-4 text-sm text-neutral/60 text-center">
									No messages yet.
								</li>
							)}
						</ul>
					</div>
				) : null}
			</section>

			{!hasAnyAccess ? (
				<div className="rounded-2xl bg-base-100 border border-base-300/60 p-10 text-center text-sm text-neutral/70">
					You don&apos;t have permissions to view analytics yet.
					Contact an owner to request access.
				</div>
			) : null}
		</div>
	);
}

export default AdminDashboardPage;
