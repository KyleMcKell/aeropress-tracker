import type { AeropressBrew } from '@prisma/client';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useCheckOwnership } from '~/lib/hooks';
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

	const { isOwner, ownerName } = useCheckOwnership(brew);
	const router = useRouter();
	const [showDeleteWarning, setShowDeleteWarning] = useState(false);

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
			<article className="relative shadow-md shadow-neutral-800 w-full max-w-3xl rounded-lg p-8 grid grid-cols-1 gap-4 border-4 border-neutral-900 bg-neutral-50 dark:border-neutral-300 dark:bg-neutral-900 dark:text-neutral-50">
				{isOwner && (
					<button
						className="absolute top-2 right-2"
						onClick={() => setShowDeleteWarning(true)}
					>
						<VisuallyHidden>Delete Brew</VisuallyHidden>
						<Icon id="trash" strokeWidth={2} size={20} />
					</button>
				)}

				<section className="overflow-auto text-center">
					<h1 className="font-bold text-3xl text-neutral-900 dark:text-neutral-200">
						{brewName}
					</h1>
					{ownerName && (
						<h2 className="mt-1 font-medium text-sm text-neutral-900 dark:text-neutral-200">
							Brewed by {ownerName.name}
						</h2>
					)}
				</section>

				{description && (
					<p className="font-medium font-article text-neutral-900 dark:text-neutral-100 md:mx-4 md:px-8 pb-4 border-b-4 border-neutral-300 dark:border-neutral-200">
						{description}
					</p>
				)}

				<section className="grid grid-cols-2 justify-center gap-4">
					<BrewDetail label="Inverted?">
						<div className={`${inverted ? '-scale-y-100' : ''}`}>
							<Icon id="coffee" strokeWidth={3} size={28} />
						</div>
						<VisuallyHidden>
							{inverted ? 'Inverted Brew' : 'Non inverted Brew'}
						</VisuallyHidden>
					</BrewDetail>

					<BrewDetail label="Water Temp">
						{waterTemp}
						<span className="text-base">
							<sup>o</sup>C
						</span>
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
			</article>
			<WarningModal
				ariaLabel="Delete Brew"
				setShowWarning={setShowDeleteWarning}
				showWarning={showDeleteWarning}
			>
				<p className="text-neutral-700 dark:text-neutral-100 font-semibold text-xl m-4">
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
