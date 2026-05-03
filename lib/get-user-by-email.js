import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";

/**
 * Load the Mongoose user document for customSession enrichment.
 * @param {string | undefined} email
 */
export async function getUserByEmail(email) {
	if (!email) return null;
	await connectMongo();
	const user = await UserModel.findOne({ email }).lean();
	return user;
}
