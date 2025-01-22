import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CNAME,
	api_key: process.env.CLOUDINARY_API_kEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

export default cloudinary;
