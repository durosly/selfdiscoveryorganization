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

export default connectMongo;
