import type { AeropressBrew } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma';

type Data = {
	brews?: AeropressBrew[];
	brew?: AeropressBrew;
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

		case 'POST': {
			const {
				name,
				brewTime,
				waterTemp,
				coffeeWeight,
				waterWeight,
				grindSize,
				roastType,
				inverted,
				favorite,
				instructions,
				description,
				userId,
			}: AeropressBrew = req.body;
			const brew = await prisma.aeropressBrew.create({
				data: {
					name,
					brewTime,
					waterTemp,
					coffeeWeight,
					waterWeight,
					grindSize,
					roastType,
					inverted,
					favorite,
					instructions,
					description,
					userId,
				},
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
