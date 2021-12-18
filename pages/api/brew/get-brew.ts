import type { NextApiRequest, NextApiResponse } from 'next';
import type { IAeropressBrew } from '~/utils/interfaces/brew';
import { GrindSize, RoastType } from '~/utils/interfaces/brew';

const getBrew = (req: NextApiRequest, res: NextApiResponse<IAeropressBrew>) => {
	// currently has test data responding
	res.status(200).json({
		id: 'string',
		name: 'first brew method',
		brewTime: 120,
		waterTemp: 100,
		coffeeWeight: 12,
		waterWeight: 200,
		grindSize: GrindSize.COARSE,
		roastType: RoastType.LIGHT,
		inverted: true,
		instructions: 'string',
		description: 'string',
		createdAt: new Date(),
		updatedAt: new Date(),
		favorite: false,
		userId: 'string',
	});
};

export default getBrew;
