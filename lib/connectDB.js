import mongoose from "mongoose";

const connectMongo = async () => {
	if (mongoose.connection.readyState >= 1) {
		console.log("Already connected to MongoDB");
		return mongoose.connection;
	}

	try {
		const connection = await mongoose.connect(process.env.MONGODB_URL);

		console.log("Connected to MongoDB");
		return connection;
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
		throw error;
	}
};

/** Native MongoDB driver handle (same connection as Mongoose) for better-auth `mongodbAdapter(db, { client })`. */
export async function getClient() {
	await connectMongo();
	const client = mongoose.connection.getClient();
	const dbName = process.env.MONGODB_NAME;
	const db = client.db(dbName || undefined);
	return { client, db };
}

export default connectMongo;
