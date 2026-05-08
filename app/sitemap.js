import connectMongo from "@/lib/connectDB";
import ProgramModel from "@/models/program";

export const revalidate = 3600;

export default async function sitemap() {
	const baseUrl = process.env.NEXT_PUBLIC_URL || "https://selfdiscoveryorganization.org";

	const staticEntries = [
		"",
		"/about-us",
		"/programs",
		"/support",
		"/contact-us",
		"/legal",
	].map((path) => ({
		url: `${baseUrl}${path}`,
		lastModified: new Date(),
		changeFrequency: path === "" ? "daily" : "weekly",
		priority: path === "" ? 1 : path === "/support" ? 0.95 : 0.8,
	}));

	let programEntries = [];
	try {
		await connectMongo();
		const programs = await ProgramModel.find(
			{ status: "publish" },
			"slug updatedAt",
		)
			.sort({ updatedAt: -1 })
			.limit(500);
		programEntries = programs.map((p) => ({
			url: `${baseUrl}/programs/${p.slug}`,
			lastModified: p.updatedAt || new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		}));
	} catch {
		programEntries = [];
	}

	return [...staticEntries, ...programEntries];
}
