import { AeropressBrew, User } from '@prisma/client';
import React from 'react';

interface Props {
	brew: AeropressBrew;
	user?: User;
}

const dataToUse = {
	id: 1,
	name: 'Test Brew',
	brewTime: 120,
	waterTemp: 100,
	coffeeWeight: 15,
	waterWeight: 200,
	grindSize: 'Any',
	roastType: 'Any',
	inverted: false,
	description: 'This brew is very very tasty',
	favorite: false,
	instructions: 'asdfasdf asdfasdfa',
	userId: 1,
};

const BrewCard = ({ brew, user }: Props) => {
	brew = dataToUse;

	return (
		<div className="grid">
			<h1 className="text-3xl font-bold">{brew.name}</h1>
			{user && <h3 className="text-sm font-thin">Brewed by {user.name}</h3>}
			{brew.description && <h2>{brew.description}</h2>}
			{brew.instructions && <p>{brew.instructions}</p>}
		</div>
	);
};

export default BrewCard;
