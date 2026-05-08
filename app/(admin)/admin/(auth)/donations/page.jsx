import DonationsTable from "./components/donations-table";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Donations",
};

function AdminDonationsPage() {
	return (
		<div>
			<header className="mb-6">
				<h1 className="text-2xl font-bold">Donations</h1>
				<p className="text-sm text-neutral/70">
					All donor activity, filterable and exportable as CSV.
				</p>
			</header>
			<DonationsTable />
		</div>
	);
}

export default AdminDonationsPage;
