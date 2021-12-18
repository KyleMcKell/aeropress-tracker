import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/utils/prisma';

type Data = {
	user: User;
};

const userActions = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { userId } = req.query;

	switch (req.method) {
		case 'GET': {
			const user = await prisma.user.findUnique({
				where: { id: parseInt(String(userId)) },
			});
			if (!user) {
				return res.status(400);
			}
			res.status(200).json({ user });
		}
		default: {
			res.status(405).end();
		}
	}
};

export default userActions;
