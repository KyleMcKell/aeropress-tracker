import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '~/lib/db';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		session: async ({ session, user }) => {
			session.userId = parseInt(user.id);
			return Promise.resolve(session);
		}, // The return type will match the one returned in `useSession()`'
		redirect: async ({ url, baseUrl }) => {
			if (url.startsWith(baseUrl)) return url;
			// Allows relative callback URLs
			else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
			return baseUrl;
		},
	},
	secret: process.env.SECRET!,
});
