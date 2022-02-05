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

	if (req.method !== 'GET') return res.status(405).end();

	const user = await prisma.user.findUnique({
		where: { id: userIdInt },
	});

	if (!user) return res.status(400);

	if (session?.userId === userIdInt) return res.status(200).json({ user });

	return res.status(200).json({
		user: {
			...user,
			email: 'coffeelover@aeropresstracker.com',
			image: "you sneakster, you aren't supposed to be here",
			name: user.name === null ? 'Stealth Barista' : user.name.split(' ')[0],
		},
	});
};

export default userActions;
