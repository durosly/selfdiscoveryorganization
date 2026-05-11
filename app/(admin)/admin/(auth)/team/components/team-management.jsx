"use client";

import { handleError } from "@/lib/handleError";
import { PERMISSION_KEYS } from "@/lib/permissions";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const INVITABLE = PERMISSION_KEYS.filter((p) => p !== "team");

function labels(key) {
	const map = {
		events: "Programs & events",
		donations: "Donations",
		messages: "Messages",
		mailer: "Mailer",
	};
	return map[key] || key;
}

export default function TeamManagement() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [inviteEmail, setInviteEmail] = useState("");
	const [invitePerms, setInvitePerms] = useState(["events"]);
	const [submitting, setSubmitting] = useState(false);

	const loadUsers = useCallback(async () => {
		setLoading(true);
		try {
			const res = await axios.get("/api/admin/users");
			if (!res.data?.status) throw new Error(res.data?.message);
			setUsers(res.data.data || []);
		} catch (e) {
			toast.error(handleError(e));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadUsers();
	}, [loadUsers]);

	async function sendInvite(e) {
		e.preventDefault();
		if (submitting) return;
		setSubmitting(true);
		const toastId = toast.loading("Sending invitation…");
		try {
			const res = await axios.post("/api/admin/invites", {
				email: inviteEmail.trim(),
				permissions: invitePerms,
			});
			if (!res.data?.status) throw new Error(res.data?.message);
			toast.success(res.data.message, { id: toastId });
			setInviteEmail("");
			await loadUsers();
		} catch (err) {
			toast.error(handleError(err), { id: toastId });
		} finally {
			setSubmitting(false);
		}
	}

	function toggleInvitePerm(key) {
		setInvitePerms((prev) =>
			prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
		);
	}

	async function saveStaffPermissions(userId, permissions) {
		const toastId = toast.loading("Saving…");
		try {
			const res = await axios.patch(`/api/admin/users/${userId}`, {
				permissions,
			});
			if (!res.data?.status) throw new Error(res.data?.message);
			toast.success("Saved", { id: toastId });
			await loadUsers();
		} catch (e) {
			toast.error(handleError(e), { id: toastId });
		}
	}

	return (
		<div className="space-y-10 max-w-3xl">
			<section className="rounded-2xl border border-base-300/60 bg-base-200/40 p-6">
				<h2 className="font-semibold text-lg mb-4">Invite staff</h2>
				<form onSubmit={sendInvite} className="space-y-4">
					<label className="form-control w-full">
						<span className="label-text text-sm">Email</span>
						<input
							type="email"
							required
							className="input input-bordered w-full max-w-md"
							value={inviteEmail}
							onChange={(e) => setInviteEmail(e.target.value)}
							placeholder="colleague@example.com"
						/>
					</label>
					<div>
						<span className="label-text text-sm block mb-2">Permissions</span>
						<div className="flex flex-wrap gap-3">
							{INVITABLE.map((key) => (
								<label key={key} className="label cursor-pointer gap-2 justify-start">
									<input
										type="checkbox"
										className="checkbox checkbox-sm checkbox-primary"
										checked={invitePerms.includes(key)}
										onChange={() => toggleInvitePerm(key)}
									/>
									<span className="label-text text-sm">{labels(key)}</span>
								</label>
							))}
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary btn-sm"
						disabled={submitting || invitePerms.length === 0}>
						Send invite
					</button>
				</form>
			</section>

			<section>
				<h2 className="font-semibold text-lg mb-4">People</h2>
				{loading ? (
					<p className="text-sm text-neutral/60">Loading…</p>
				) : users.length === 0 ? (
					<p className="text-sm text-neutral/60">No users found.</p>
				) : (
					<div className="overflow-x-auto rounded-2xl border border-base-300/60">
						<table className="table table-zebra">
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
									<th>Permissions</th>
								</tr>
							</thead>
							<tbody>
								{users.map((u) => (
									<UserRow
										key={u._id}
										user={u}
										onSave={(perms) =>
											saveStaffPermissions(u._id, perms)
										}
									/>
								))}
							</tbody>
						</table>
					</div>
				)}
			</section>
		</div>
	);
}

function UserRow({ user, onSave }) {
	const isOwner =
		user.role === "owner" || user.account_type === "admin";
	const [perms, setPerms] = useState(user.permissions || []);

	useEffect(() => {
		setPerms(user.permissions || []);
	}, [user.permissions]);

	function toggle(key) {
		setPerms((prev) =>
			prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
		);
	}

	if (isOwner) {
		return (
			<tr>
				<td className="font-medium">{user.name || "—"}</td>
				<td className="text-xs">{user.email}</td>
				<td>
					<span className="badge badge-neutral badge-sm">Owner</span>
				</td>
				<td className="text-xs text-neutral/60">Full access</td>
			</tr>
		);
	}

	return (
		<tr>
			<td className="font-medium">{user.name || "—"}</td>
			<td className="text-xs">{user.email}</td>
			<td>
				<span className="badge badge-ghost badge-sm">Staff</span>
			</td>
			<td>
				<div className="flex flex-wrap gap-2 items-center">
					{INVITABLE.map((key) => (
						<label key={key} className="label cursor-pointer gap-1 justify-start py-0">
							<input
								type="checkbox"
								className="checkbox checkbox-xs checkbox-primary"
								checked={perms.includes(key)}
								onChange={() => toggle(key)}
							/>
							<span className="label-text text-xs">{labels(key)}</span>
						</label>
					))}
					<button
						type="button"
						className="btn btn-xs btn-outline ml-2"
						onClick={() => onSave(perms)}
						disabled={perms.length === 0}>
						Save
					</button>
				</div>
			</td>
		</tr>
	);
}
