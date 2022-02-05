import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import prisma from '~/lib/db';

type Data = {
	user: User;
};

const userActions = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { userId } = req.query;
	const session = await getSession({ req });

	const userIdInt = Number(userId);

	switch (req.method) {
		case 'GET': {
			const user = await prisma.user.findUnique({
				where: { id: userIdInt },
			});
			if (!user) {
				return res.status(400);
			} else if (session?.userId === userIdInt) {
				return res.status(200).json({ user });
			} else {
				user.email = 'coffeelover@aeropresstracker.com';
				user.image = "you sneakster, you aren't supposed to be here";
				user.emailVerified = null;
				user.name =
					user.name === null ? 'Stealth Barista' : user.name.split(' ')[0];
				return res.status(200).json({ user });
			}
		}
		default: {
			return res.status(405).end();
		}
	}
};
export default userActions;
