import connectMongo from "@/lib/connectDB";
import ArticleModel from "@/models/program-article";
import Markdown from "react-markdown";

async function DisplayArticle({ id }) {
	await connectMongo();
	const article = await ArticleModel.findOne({ program_id: id });

	if (!article) {
		return null;
	}

	return (
		<div className="mt-10">
			<h3 className="text-2xl font-bold text-center mb-3">Blog</h3>
			<div className="prose p-2 rounded-lg  line-clamp-4 max-w-none">
				<Markdown>{article.body}</Markdown>
			</div>
		</div>
	);
}

export default DisplayArticle;
