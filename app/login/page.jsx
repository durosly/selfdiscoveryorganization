import LoginForm from "./components/form";

function AdminLoginPage() {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col ">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login to dashboard!</h1>
					<p className="py-6">Only for authorized users</p>
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<LoginForm />
				</div>
			</div>
		</div>
	);
}

export default AdminLoginPage;
