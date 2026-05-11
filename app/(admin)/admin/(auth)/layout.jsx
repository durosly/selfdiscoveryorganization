import AdminSidebar, { AdminDrawerToggle } from "./components/admin-sidebar";

export const dynamic = "force-dynamic";

function AdminLayout({ children }) {
	return (
		<div className="drawer max-sm:block  lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col ">
				<div>
					<AdminDrawerToggle />
				</div>
				<main className="p-5">{children}</main>
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
				<AdminSidebar />
			</div>
		</div>
	);
}

export default AdminLayout;
