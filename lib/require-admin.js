/**
 * @deprecated Use requirePermission("events" | "donations" | ...) from @/lib/guard-permission.
 *
 * Historically this enforced account_type === "admin".
 * Registrations and donations routes now use explicit permissions.
 */
export { requirePermission } from "@/lib/guard-permission";
