import type { AeropressBrew } from '@prisma/client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useUser } from '~/lib/hooks';
import BrewDetail from '../BrewDetail';

import Button from '../Button';
import Icon from '../Icon';
import Timer from '../Timer';
import VisuallyHidden from '../VisuallyHidden';
import WarningModal from '../WarningModal';

interface Props {
	brew: AeropressBrew;
}

const BrewCard = ({ brew }: Props) => {
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
		info,
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
		<>
			<article className="relative shadow-md w-full rounded-lg p-8 grid grid-cols-1 gap-4 border-4 border-neutral-900 bg-neutral-50 dark:border-neutral-200 dark:bg-neutral-900 dark:text-neutral-50">
				{isOwner && (
					<button
						className="absolute top-2 right-2"
						onClick={() => setShowDeleteWarning(true)}
					>
						<Icon id="trash" strokeWidth={2} size={20} />
					</button>
				)}

				<section className="overflow-auto text-center">
					<h1 className="font-bold text-3xl text-neutral-900 dark:text-neutral-200">
						loremloremloremloremloremlorem
					</h1>
					{user && (
						<h2 className="mt-1 font-medium text-sm text-neutral-900 dark:text-neutral-200">
							Brewed by {user.name}
						</h2>
					)}
				</section>

				{description && (
					<h2 className="font-medium font-article text-neutral-900 dark:text-neutral-100">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nisi,
						vero aspernatur magni veniam velit ut eum autem deleniti, error
						neque quasi fugiat iure labore.
					</h2>
				)}

				<section className="grid grid-cols-2 justify-center gap-4">
					<BrewDetail label="Inverted?">
						<div className={`${inverted ? '-scale-y-100' : ''}`}>
							<Icon id="coffee" strokeWidth={3} size={28} />
							<VisuallyHidden>
								{inverted ? 'Inverted Brew' : 'Non inverted Brew'}
							</VisuallyHidden>
						</div>
					</BrewDetail>

					<BrewDetail label="Water Temp">
						{waterTemp}
						<sup>C</sup>
					</BrewDetail>

					<BrewDetail label="Water Weight">
						{waterWeight}
						<sub>ml</sub>
					</BrewDetail>

					<BrewDetail label="Coffee Weight">
						{coffeeWeight}
						<sub>g</sub>
					</BrewDetail>

					<div className="col-span-2 sm:col-span-1">
						<BrewDetail label="Grind Size">
							{grindSize === 'any' || grindSize === 'Any' || !grindSize ? (
								<>Any</>
							) : (
								<>{grindSize}</>
							)}
						</BrewDetail>
					</div>

					<div className="col-span-2 sm:col-span-1">
						<BrewDetail label="Roast Type">
							{roastType === 'any' || roastType === 'Any' || !roastType ? (
								<>Any</>
							) : (
								<>{roastType}</>
							)}
						</BrewDetail>
					</div>
				</section>

				<p className="">{info}</p>

				<Timer time={brewTime} />

				{/* {isOwner && (
					<>
						<div className="flex justify-between">
							<Button onClick={() => setShowDeleteWarning(true)}>
								Delete Brew
							</Button>
						</div>
					</>
				)} */}
			</article>
			<WarningModal
				ariaLabel="Delete Brew"
				setShowWarning={setShowDeleteWarning}
				showWarning={showDeleteWarning}
			>
				<p className="text-neutral-700 dark:text-neutral-100 font-semibold text-lg">
					Are you sure you want to delete this brew?
				</p>
				<div className="flex justify-end gap-4">
					<Button onClick={() => setShowDeleteWarning(false)}>Cancel</Button>
					<Button onClick={handleDelete}>Delete</Button>
				</div>
			</WarningModal>
		</>
	);
};

export default BrewCard;
