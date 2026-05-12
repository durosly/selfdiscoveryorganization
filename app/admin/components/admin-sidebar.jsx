"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import {
	LuCalendarDays,
	LuChartLine,
	LuHeartHandshake,
	LuMail,
	LuMailbox,
	LuPanelLeftOpen,
	LuSettings,
	LuUsers,
} from "react-icons/lu";
import LogoutButton from "./logout-btn";

function can(permissions, key) {
	return Array.isArray(permissions) && permissions.includes(key);
}

export default function AdminSidebar() {
	const { data: session, isPending } = useSession();
	const permissions = session?.user?.permissions ?? [];

	return (
		<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
			<li>
				<Link href="/admin/dashboard">
					<LuChartLine />
					Dashboard
				</Link>
			</li>
			{isPending ? (
				<li className="opacity-50 text-sm px-4 py-2">Loading menu…</li>
			) : (
				<>
					<li>
						<Link href="/admin/settings">
							<LuSettings />
							Settings
						</Link>
					</li>
					{can(permissions, "events") ? (
						<li>
							<Link href="/admin/programs">
								<LuCalendarDays />
								Programs
							</Link>
						</li>
					) : null}
					{can(permissions, "donations") ? (
						<li>
							<Link href="/admin/donations">
								<LuHeartHandshake />
								Donations
							</Link>
						</li>
					) : null}
					{can(permissions, "messages") ? (
						<li>
							<Link href="/admin/messages">
								<LuMailbox />
								Messages
							</Link>
						</li>
					) : null}
					{can(permissions, "mailer") ? (
						<li>
							<Link href="/admin/mailer">
								<LuMail />
								Mailer
							</Link>
						</li>
					) : null}
					{can(permissions, "team") ? (
						<li>
							<Link href="/admin/team">
								<LuUsers />
								Team
							</Link>
						</li>
					) : null}
				</>
			)}
			<li>
				<LogoutButton />
			</li>
		</ul>
	);
}

export function AdminDrawerToggle() {
	return (
		<label
			htmlFor="my-drawer-2"
			className="btn btn-neutral drawer-button lg:hidden">
			<LuPanelLeftOpen />
		</label>
	);
}
