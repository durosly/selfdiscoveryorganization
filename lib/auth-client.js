"use client";

import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_URL,
	plugins: [customSessionClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
