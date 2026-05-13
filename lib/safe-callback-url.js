/**
 * Allow same-site navigation targets only (path + query), for post-login redirects.
 * @param {unknown} raw
 * @returns {string}
 */
export function sanitizeInternalCallbackPath(raw) {
	if (typeof raw !== "string") return "/admin/dashboard";
	const s = raw.trim();
	if (!s.startsWith("/") || s.startsWith("//")) return "/admin/dashboard";
	if (s.includes("://")) return "/admin/dashboard";
	return s;
}
