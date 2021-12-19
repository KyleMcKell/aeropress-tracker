import type { AeropressBrew } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma';

type Data = {
	brews: AeropressBrew[];
};

const userActions = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	switch (req.method) {
		case 'GET': {
			const brews = await prisma.aeropressBrew.findMany();
			if (!brews) {
				return res.status(400);
			}
			res.status(200).json({ brews });
		}
		default: {
			res.status(405).end();
		}
	}
};

export default userActions;
