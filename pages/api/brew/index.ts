import type { AeropressBrew } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma';
import { getErrorMessage } from '~/lib/utils';

export type Data = {
	brews?: AeropressBrew[];
	brew?: AeropressBrew;
	error?: string;
};

const brewActions = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	switch (req.method) {
		case 'GET': {
			const brews = await prisma.aeropressBrew.findMany();
			if (!brews) {
				return res.status(400);
			}
			return res.status(200).json({ brews });
		}

		case 'POST': {
			const {
				name,
				description,
				inverted,
				brewTime,
				coffeeWeight,
				waterWeight,
				waterTemp,
				favorite,
				roastType: grindSize,
				roastType,
				instructions,
				userId,
			}: AeropressBrew = req.body;
			try {
				if (!userId) {
					throw new Error("You aren't logged in!");
				}
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
					throw new Error('Could not create brew');
				}
				return res.status(200).json({ brew });
			} catch (error) {
				let message = getErrorMessage(error);
				console.log(message);
				return res.status(400).json({ error: message });
			}
		}
		default: {
			return res.status(405).end();
		}
	}
};

export default brewActions;
