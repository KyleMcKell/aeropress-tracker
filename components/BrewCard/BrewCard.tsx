import type { AeropressBrew, User } from '@prisma/client';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useUser } from '~/lib/hooks';

import Button from '../Button';
import Icon from '../Icon';
import Timer from '../Timer';
import VisuallyHidden from '../VisuallyHidden';

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

	const handleDelete = () => {
		const deletedBrew = fetch(`/api/brew/${brew.id}`, {
			method: 'DELETE',
		}).then((res) => res.json());
		console.log(deletedBrew);
		router.push('/profile');
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

			<p className="col-span-2">
				{inverted ? (
					<>
						Flip it over! We&apos;re{' '}
						<span className="font-semibold text-neutral-700 dark:text-neutral-300">
							Inverting
						</span>{' '}
						this one
					</>
				) : (
					<>
						Keepin it classic,{' '}
						<span className="font-semibold text-neutral-700 dark:text-neutral-300">
							no Inverting
						</span>{' '}
						today
					</>
				)}
			</p>

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
				{grindSize === 'any' || !roastType ? (
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
				{roastType === 'any' || !roastType ? (
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
					<DialogOverlay
						isOpen={showDeleteWarning}
						onDismiss={() => setShowDeleteWarning(false)}
						className="fixed inset-0 h-full w-full flex justify-center items-center bg-neutral-800 bg-opacity-40 dark:bg-black dark:bg-opacity-80"
					>
						<DialogContent
							className="flex justify-between gap-4 bg-neutral-100 dark:bg-neutral-900 flex-col py-4 px-8 rounded-lg"
							aria-label="brew delete warning"
						>
							<button
								onClick={() => setShowDeleteWarning(false)}
								className="self-end -mr-4 text-neutral-900 dark:text-white"
							>
								<Icon id="close" strokeWidth={4} />
								<VisuallyHidden>Dismiss Menu</VisuallyHidden>
							</button>
							<p className="text-neutral-700 dark:text-neutral-100 font-semibold text-lg">
								Are you sure you want to delete this brew?
							</p>
							<div className="flex justify-end gap-4">
								<Button onClick={() => setShowDeleteWarning(false)}>
									Cancel
								</Button>
								<Button onClick={handleDelete}>Delete</Button>
							</div>
						</DialogContent>
					</DialogOverlay>
				</>
			)}
		</article>
	);
};

export default BrewCard;
