import type { AeropressBrew } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma';

type Data = {
	brew: AeropressBrew;
};

const userActions = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { brewId } = req.query;

	switch (req.method) {
		case 'GET': {
			const brew = await prisma.aeropressBrew.findUnique({
				where: { id: parseInt(String(brewId)) },
			});
			if (!brew) {
				return res.status(400);
			}
			res.status(200).json({ brew });
		}
		default: {
			res.status(405).end();
		}
	}
};

export default userActions;