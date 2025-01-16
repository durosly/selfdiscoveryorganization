import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import referralCodeGenerator from 'referral-code-generator';

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
});

// userSchema.pre("save", function (next) {
// 	const user = this;
// 	// only hash the password if it has been modified (or is new)

// 	if (!user.isModified("password")) return next();

// 	// generate a salt
// 	bcrypt.genSalt(10, function (err, salt) {
// 		if (err) return next(err);

// 		// hash the password using our new salt
// 		bcrypt.hash(user.password, salt, function (err, hash) {
// 			if (err) return next(err);
// 			// override the cleartext password with the hashed one

// 			user.password = hash;
// 			next();
// 		});
// 	});
// });

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
