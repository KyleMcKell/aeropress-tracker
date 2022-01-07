import type { AeropressBrew, User } from '@prisma/client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useUser } from '~/lib/hooks';

import Button from '../Button';
import Icon from '../Icon';
import Timer from '../Timer';
import WarningModal from '../WarningModal';

interface Props {
	brew: AeropressBrew;
	user?: User;
	showTimer?: boolean;
	showControls?: boolean;
}

const BrewCard = ({ brew, showTimer = true, showControls = false }: Props) => {
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

	const { user } = useUser(brew.userId);
	const { data: session } = useSession();
	const router = useRouter();
	const [showDeleteWarning, setShowDeleteWarning] = useState(false);

	const isOwner = session?.userId === brew.userId;

	const handleDelete = async () => {
		const res = await fetch(`/api/brew/${brew.id}`, {
			method: 'DELETE',
		});

		const deletedBrew = await res.json();

		router.push('/profile');
		return deletedBrew;
	};

	return (
		<article className="border-4 border-neutral-600 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 rounded-xl p-4 max-w-2xl w-full gap-4 grid grid-cols-2 h-full">
			<div className="col-span-2 flex flex-col gap-2">
				<h1 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-200 text-center">
					{brewName}
				</h1>
				{user && (
					<h3 className="text-neutral-900 dark:text-neutral-200 text-center">
						Brewed by {user.name}
					</h3>
				)}
			</div>

			{description && (
				<h2 className="font-semibold col-span-2 text-neutral-800 dark:text-neutral-100">
					{description}
				</h2>
			)}

			<div
				className={`${
					inverted ? '-scale-y-100' : ''
				} text-neutral-800 dark:text-neutral-100 block`}
			>
				<Icon id="coffee" strokeWidth={3} size={28} />
			</div>

			<p className="col-span-2">
				Heat your water to{' '}
				<span className="font-semibold text-neutral-700 dark:text-neutral-300">
					{waterTemp}
					<sup>C</sup>
				</span>
			</p>

			<p className="col-span-2">
				...which you&apos;ll need{' '}
				<span className="font-semibold text-neutral-700 dark:text-neutral-300">
					{waterWeight}
					<sub>ml</sub>
				</span>{' '}
				of
			</p>

			<p className="col-span-2">
				...and{' '}
				<span className="font-semibold text-neutral-700 dark:text-neutral-300">
					{coffeeWeight}
					<sub>g</sub>
				</span>{' '}
				of coffee
			</p>

			<p className="col-span-2">
				{grindSize === 'any' || grindSize === 'Any' || !grindSize ? (
					<>
						Feel free to use{' '}
						<span className="font-semibold text-neutral-700 dark:text-neutral-300">
							ANY
						</span>{' '}
						grind size!
					</>
				) : grindSize === 'Extra Fine' ? (
					<>
						Grind to about an{' '}
						<span className="font-semibold text-neutral-700 dark:text-neutral-300">
							{grindSize}
						</span>{' '}
						level
					</>
				) : (
					<>
						Grind to about a{' '}
						<span className="font-semibold text-neutral-700 dark:text-neutral-300">
							{grindSize}
						</span>{' '}
						level
					</>
				)}
			</p>

			<p className="col-span-2">
				{roastType === 'any' || roastType === 'Any' || !roastType ? (
					<>
						For this one{' '}
						<span className="font-semibold text-neutral-700 dark:text-neutral-300">
							ANY
						</span>{' '}
						roast of coffee will do!
					</>
				) : (
					<>
						Find your best{' '}
						<span className="font-semibold text-neutral-700 dark:text-neutral-300">
							{roastType}
						</span>{' '}
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
				<>
					<div className="col-span-2 flex gap-2">
						<Button onClick={() => setShowDeleteWarning(true)}>
							Delete Brew
						</Button>
					</div>
					<WarningModal
						ariaLabel="Delete Brew"
						setShowWarning={setShowDeleteWarning}
						showWarning={showDeleteWarning}
					>
						<p className="text-neutral-700 dark:text-neutral-100 font-semibold text-lg">
							Are you sure you want to delete this brew?
						</p>
						<div className="flex justify-end gap-4">
							<Button onClick={() => setShowDeleteWarning(false)}>
								Cancel
							</Button>
							<Button onClick={handleDelete}>Delete</Button>
						</div>
					</WarningModal>
				</>
			)}
		</article>
	);
};

export default BrewCard;
