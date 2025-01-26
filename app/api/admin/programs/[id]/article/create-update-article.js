import connectMongo from "@/lib/connectDB";
import ArticleModel, { ArticleValidationSchema } from "@/models/program-article";

async function createUpdateArticle(req) {
	try {
		const data = await req.json();
		const isValid = ArticleValidationSchema.safeParse(data);

		if (!isValid.success) {
			return Response.json(
				{ message: isValid.error.errors[0].message },
				{ status: 400 }
			);
		}

		const { program_id, body } = data;

		await connectMongo();
		const article = await ArticleModel.findOne({ program_id });
		if (article) {
			article.body = body;
			await article.save();
		} else {
			await ArticleModel.create({ program_id, body });
		}

		return Response.json({ message: "Article saved successfully" });
	} catch (error) {
		const message = error.message || "Something went wrong";
		return Response.json({ message }, { status: 500 });
	}
}

export default createUpdateArticle;
