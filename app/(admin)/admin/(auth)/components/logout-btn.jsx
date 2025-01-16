"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

function LogoutButton() {
	const router = useRouter();
	async function logout() {
		const toastId = toast.loading("Logging out...");
		try {
			const data = await signOut({ redirect: false, callbackUrl: "/" });
			router.push(data.url);
			toast.success("Successful", { id: toastId });
		} catch (error) {
			toast.error(error.message, { id: toastId });
		}
	}
	return (
		<button
			onClick={logout}
			className="btn btn-sm btn-error"
		>
			logout
		</button>
	);
}

export default LogoutButton;
