/** Feature keys for staff (owner has all implicitly). */
export const PERMISSION_KEYS = [
	"events",
	"donations",
	"messages",
	"mailer",
	"team",
];

/**
 * @param {import("mongoose").LeanDocument<any> | null | undefined} doc - MongoDB User document
 */
export function normalizeUserAccess(doc) {
	if (!doc) {
		return { role: "staff", permissions: [] };
	}
	const legacyAdmin = doc.account_type === "admin";
	const role =
		doc.role === "owner" || legacyAdmin
			? "owner"
			: doc.role === "staff"
				? "staff"
				: doc.role || "staff";

	if (role === "owner") {
		return { role: "owner", permissions: [...PERMISSION_KEYS] };
	}

	const permissions = Array.isArray(doc.permissions)
		? doc.permissions.filter((p) => PERMISSION_KEYS.includes(p))
		: [];

	return { role: "staff", permissions };
}

/**
 * @param {{ role: string; permissions: string[] }} access
 * @param {string} perm
 */
export function hasPermission(access, perm) {
	if (access.role === "owner") return true;
	return access.permissions.includes(perm);
}

export function isOwner(access) {
	return access.role === "owner";
}
