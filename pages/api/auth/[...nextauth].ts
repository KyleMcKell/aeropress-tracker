import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '~/lib/prisma';

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
		}, // The return type will match the one returned in `useSession()`
	},
	secret: process.env.SECRET!,
});
