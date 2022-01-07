import type { AeropressBrew } from '@prisma/client';

import { useUser } from '~/lib/hooks';
import BrewDetail from '../BrewDetail';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

interface Props {
	brew: AeropressBrew;
}

const BrewGridCard = ({ brew }: Props) => {
	const {
		name: brewName,
		waterTemp,
		coffeeWeight,
		waterWeight,
		grindSize,
		roastType,
		inverted,
		description,
	} = brew;

	const { user } = useUser(brew.userId);

	return (
		<article className="h-full relative shadow-md shadow-neutral-800 w-full max-w-3xl rounded-lg p-8 grid grid-cols-1 gap-4 border-4 border-neutral-900 bg-neutral-50 dark:border-neutral-300 dark:bg-neutral-900 dark:text-neutral-50">
			<section className="overflow-auto text-center">
				<h1 className="font-bold text-3xl text-neutral-900 dark:text-neutral-200">
					{brewName}
				</h1>
				{user && (
					<h2 className="mt-1 font-medium text-sm text-neutral-900 dark:text-neutral-200">
						Brewed by {user.name}
					</h2>
				)}
			</section>

			{description && (
				<h2 className="font-medium text-center font-article text-neutral-900 dark:text-neutral-100">
					{description}
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

				<div className="col-span-1 sm:col-span-2">
					<BrewDetail label="Grind Size">
						{grindSize === 'any' || grindSize === 'Any' || !grindSize ? (
							<>Any</>
						) : (
							<>{grindSize}</>
						)}
					</BrewDetail>
				</div>

				<div className="col-span-1 sm:col-span-2">
					<BrewDetail label="Roast Type">
						{roastType === 'any' || roastType === 'Any' || !roastType ? (
							<>Any</>
						) : (
							<>{roastType}</>
						)}
					</BrewDetail>
				</div>
			</section>
		</article>
	);
};

export default BrewGridCard;
