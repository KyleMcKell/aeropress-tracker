import type { AeropressBrew } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '~/lib/db';

type Data = {
	brew: AeropressBrew;
};

const brewIdActions = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { brewId } = req.query;

	switch (req.method) {
		case 'GET': {
			const brew = await prisma.aeropressBrew.findUnique({
				where: { id: parseInt(String(brewId)) },
			});
			if (!brew) {
				return res.status(400);
			}
			return res.status(200).json({ brew });
		}
		case 'DELETE': {
			const brew = await prisma.aeropressBrew.delete({
				where: { id: parseInt(String(brewId)) },
			});
			if (!brew) {
				return res.status(400);
			}
			return res.status(200).json({ brew });
		}
		case 'PATCH': {
			const brewPayload: AeropressBrew = req.body;
			const brew = await prisma.aeropressBrew.update({
				where: { id: parseInt(String(brewId)) },
				data: {
					...brewPayload,
				},
			});
			if (!brew) {
				return res.status(400);
			}
			return res.status(200).json({ brew });
		}
		default: {
			return res.status(405).end();
		}
	}
};

export default brewIdActions;
