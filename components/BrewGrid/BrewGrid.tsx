import type { AeropressBrew } from '@prisma/client';

import Link from 'next/link';

import BrewGridElement from '../BrewGridCard';

interface Props {
	brews: AeropressBrew[];
}

const BrewGrid = ({ brews }: Props) => {
	// reverse brews so newest brews are on top
	const reversedBrews = brews.slice(0).reverse();

	return (
		<section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-stretch items-stretch">
			{(!brews || brews?.length === 0) && (
				<p className="col-span-full place-self-center text-lg font-medium text-neutral-900 dark:text-neutral-200">
					No Brews, sorry!
				</p>
			)}
			{reversedBrews.map((brew) => (
				<Link href={`/${brew.id}`} passHref key={brew.id}>
					<a>
						<BrewGridElement brew={brew} />
					</a>
				</Link>
			))}
		</section>
	);
};

export default BrewGrid;
