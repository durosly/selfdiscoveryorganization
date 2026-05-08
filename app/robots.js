export default function robots() {
	const baseUrl =
		process.env.NEXT_PUBLIC_URL || "https://selfdiscoveryorganization.org";
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin", "/api/admin", "/login"],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
