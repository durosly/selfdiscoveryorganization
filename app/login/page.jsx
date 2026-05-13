import { sanitizeInternalCallbackPath } from "@/lib/safe-callback-url";
import LoginForm from "./components/form";

async function AdminLoginPage({ searchParams }) {
	const params = await searchParams;
	const raw = params?.callbackUrl;
	const callbackUrl =
		typeof raw === "string" && raw.length > 0
			? sanitizeInternalCallbackPath(raw)
			: "/admin/dashboard";

	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col ">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login to dashboard!</h1>
					<p className="py-6">Only for authorized users</p>
				</div>
				<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<LoginForm callbackUrl={callbackUrl} />
				</div>
			</div>
		</div>
	);
}

export default AdminLoginPage;
