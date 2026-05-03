import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import bcrypt from "bcryptjs";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { getClient } from "@/lib/connectDB";
import { getUserByEmail } from "@/lib/get-user-by-email";

const { client, db } = await getClient();

const trustedOrigins = [];
if (process.env.NEXT_PUBLIC_URL) {
	trustedOrigins.push(process.env.NEXT_PUBLIC_URL);
}

const authOptions = {
	database: mongodbAdapter(db, { client }),

	session: {
		expiresIn: 4 * 60 * 60, // 4 hours (parity with previous next-auth maxAge)
		updateAge: 60 * 60, // 1 hour (parity with previous updateAge)
	},

	user: {
		modelName: "users",
		additionalFields: {
			account_type: {
				type: "string",
				required: false,
			},
		},
	},

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		password: {
			hash: async (password) => {
				const salt = await bcrypt.genSalt(12);
				return bcrypt.hash(password, salt);
			},
			verify: async ({ hash, password }) => {
				return bcrypt.compare(password, hash);
			},
		},
	},

	plugins: [
		customSession(async ({ user, session }) => {
			const fullUser = await getUserByEmail(user.email);
			return {
				user: {
					...user,
					account_type: fullUser?.account_type ?? user.account_type ?? null,
				},
				session,
			};
		}),
		nextCookies(),
	],

	baseURL: process.env.NEXT_PUBLIC_URL,
	basePath: "/api/auth",
	secret: process.env.BETTER_AUTH_SECRET,
};

if (trustedOrigins.length) {
	authOptions.trustedOrigins = trustedOrigins;
}

export const auth = betterAuth(authOptions);
