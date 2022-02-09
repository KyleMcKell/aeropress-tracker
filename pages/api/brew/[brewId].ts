import type { AeropressBrew } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '~/lib/db';

type Data = {
	brew: AeropressBrew;
};

const methods = {
	GET: 'GET',
	DELETE: 'DELETE',
	PATCH: 'PATCH',
};

const brewIdActions = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { brewId: queriedId } = req.query;
	const brewId = Number(queriedId);

	switch (req.method) {
		case methods.GET:
			const uniqueBrew = await prisma.aeropressBrew.findUnique({
				where: { id: brewId },
			});

			if (!uniqueBrew) return res.status(400);
			return res.status(200).json({ brew: uniqueBrew });

		case methods.DELETE:
			const deletedBrew = await prisma.aeropressBrew.delete({
				where: { id: brewId },
			});

			if (!deletedBrew) return res.status(400);
			return res.status(200).json({ brew: deletedBrew });

		case methods.PATCH:
			const brewPayload: AeropressBrew = req.body;

			const updatedBrew = await prisma.aeropressBrew.update({
				where: { id: brewId },
				data: {
					...brewPayload,
				},
			});

			if (!updatedBrew) return res.status(400);
			return res.status(200).json({ brew: updatedBrew });

		default:
			return res.status(405).end();
	}
};

export default brewIdActions;
