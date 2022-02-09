import type { AeropressBrew } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '~/lib/db';
import { getErrorMessage } from '~/lib/utils';

export type Data = {
	brews?: AeropressBrew[];
	brew?: AeropressBrew;
	error?: string;
};

const methods = {
	GET: 'GET',
	POST: 'POST',
};

const brewActions = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	switch (req.method) {
		case methods.GET:
			const brews = await prisma.aeropressBrew.findMany({
				orderBy: { id: 'asc' },
			});

			if (!brews) return res.status(400);
			return res.status(200).json({ brews });

		case methods.POST:
			const {
				name,
				description,
				inverted,
				brewTime,
				coffeeWeight,
				waterWeight,
				waterTemp,
				grindSize,
				roastType,
				userId,
			}: AeropressBrew = req.body;
			try {
				if (!userId) throw new Error("You aren't logged in!");
				const createdBrew = await prisma.aeropressBrew.create({
					data: {
						name,
						brewTime,
						waterTemp,
						coffeeWeight,
						waterWeight,
						grindSize,
						roastType,
						inverted,
						description,
						userId,
					},
				});

				if (!createdBrew) throw new Error('Could not create brew');

				return res.status(200).json({ brew: createdBrew });
			} catch (error) {
				let message = getErrorMessage(error);
				console.log(message);

				return res.status(400).json({ error: message });
			}

		default:
			return res.status(405).end();
	}
};

export default brewActions;
