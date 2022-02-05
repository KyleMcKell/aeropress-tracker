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

	const userIdInt = parseInt(String(userId));

	if (session?.userId === userIdInt) {
		switch (req.method) {
			case 'GET': {
				const user = await prisma.user.findUnique({
					where: { id: userIdInt },
				});
				if (!user) {
					return res.status(400);
				}
				return res.status(200).json({ user });
			}
			default: {
				return res.status(405).end();
			}
		}
	} else {
		return res.status(401).end();
	}
};

export default userActions;
