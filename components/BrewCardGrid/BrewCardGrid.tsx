import type { AeropressBrew } from '@prisma/client';
import Link from 'next/link';

import BrewCard from '../BrewCard';

interface Props {
	brews: AeropressBrew[];
}

const BrewCardGrid = ({ brews }: Props) => {
	return (
		<section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-stretch items-stretch">
			{(!brews || brews?.length === 0) && (
				<p className="col-span-full place-self-center text-lg font-medium text-neutral-900 dark:text-neutral-200">
					No Brews, sorry!
				</p>
			)}
			{brews?.map((brew) => (
				<Link href={`/brew/${brew.id}`} passHref key={brew.id}>
					<a>
						<BrewCard brew={brew} showTimer={false} />
					</a>
				</Link>
			))}
		</section>
	);
};

export default BrewCardGrid;
