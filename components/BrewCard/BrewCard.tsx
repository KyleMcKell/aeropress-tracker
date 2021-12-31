import type { AeropressBrew, User } from '@prisma/client';

import React from 'react';

import Button from '../Button';
import Timer from '../Timer';

interface Props {
	brew: AeropressBrew;
	user?: User;
	showTimer?: boolean;
	showControls?: boolean;
}

const BrewCard = ({
	brew,
	user,
	showTimer = true,
	showControls = false,
}: Props) => {
	const {
		name: brewName,
		brewTime,
		waterTemp,
		coffeeWeight,
		waterWeight,
		grindSize,
		roastType,
		inverted,
		description,
	} = brew;

	const isOwner = user?.id === brew.userId;

	return (
		<article className="border-4 border-neutral-600 bg-neutral-50 rounded-xl p-4 max-w-2xl w-full gap-4 grid grid-cols-2 h-full">
			<div className="col-span-2">
				<h1 className="text-3xl font-extrabold text-neutral-900 text-center">
					{brewName}
				</h1>
				{user && (
					<h3 className="text-sm text-neutral-900 text-center">
						Brewed by {user.name}
					</h3>
				)}
			</div>

			{description && (
				<h2 className="font-semibold col-span-2 text-neutral-800">
					{description}
				</h2>
			)}

			<p className="col-span-2">
				{inverted ? (
					<>
						Flip it over! We&apos;re{' '}
						<span className="font-semibold text-neutral-700">Inverting</span>{' '}
						this one
					</>
				) : (
					<>
						Keepin it classic,{' '}
						<span className="font-semibold text-neutral-700">no Inverting</span>{' '}
						today
					</>
				)}
			</p>

			<p className="col-span-2">
				Heat your water to{' '}
				<span className="font-semibold text-neutral-700">
					{waterTemp}
					<sup>C</sup>
				</span>
			</p>

			<p className="col-span-2">
				...which You&apos;ll need{' '}
				<span className="font-semibold text-neutral-700">
					{waterWeight}
					<sub>g</sub>
				</span>{' '}
				of
			</p>

			<p className="col-span-2">
				...and{' '}
				<span className="font-semibold text-neutral-700">
					{coffeeWeight}
					<sub>g</sub>
				</span>{' '}
				of coffee
			</p>

			<p className="col-span-2">
				{grindSize === 'Any' || !roastType ? (
					<>
						Feel free to use{' '}
						<span className="font-semibold text-neutral-700">ANY</span> grind
						size!
					</>
				) : grindSize === 'Extra Fine' ? (
					<>
						Grind to about an{' '}
						<span className="font-semibold text-neutral-700">{grindSize}</span>{' '}
						level
					</>
				) : (
					<>
						Grind to about a{' '}
						<span className="font-semibold text-neutral-700">{grindSize}</span>{' '}
						level
					</>
				)}
			</p>

			<p className="col-span-2">
				{roastType === 'Any' || !roastType ? (
					<>
						For this one{' '}
						<span className="font-semibold text-neutral-700">ANY</span> roast of
						coffee will do!
					</>
				) : (
					<>
						Find your best{' '}
						<span className="font-semibold text-neutral-700">{roastType}</span>{' '}
						roast
					</>
				)}
			</p>
			{showTimer && (
				<div className="col-span-2">
					<Timer time={brewTime} />
				</div>
			)}
			{isOwner && showControls && (
				<div className="col-span-2 flex gap-2">
					<Button>Update Brew</Button>
					<Button>Delete Brew</Button>
				</div>
			)}
		</article>
	);
};

export default BrewCard;
