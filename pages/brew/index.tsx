import type { NextPage, GetStaticProps } from 'next';
import type { AeropressBrew } from '@prisma/client';

import Link from 'next/link';

import prisma from '~/lib/db';

import Layout from '~/components/Layout';
import BrewCard from '~/components/BrewCard';
import LinkButton from '~/components/LinkButton';

interface Props {
	brews: AeropressBrew[];
}

const Brews: NextPage<Props> = ({ brews }: Props) => {
	return (
		<Layout title={'Brews'}>
			<div className="w-full md:w-5/6 flex flex-col justify-center items-center gap-8">
				<h1 className="text-4xl font-semibold text-neutral-900">Brews</h1>

				{(!brews || brews?.length === 0) && <div>No Brews, sorry!</div>}
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center items-stretch">
					{brews?.map((brew) => (
						<div key={brew.id} className="h-full">
							<Link href={`/brew/${brew.id}`} passHref>
								<a>
									<BrewCard brew={brew} showTimer={false} />
								</a>
							</Link>
						</div>
					))}
				</div>

				<LinkButton href="/brew/new">Create a New Brew</LinkButton>
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const brews = await prisma.aeropressBrew.findMany();

	return {
		props: {
			brews,
		},
		revalidate: 1,
	};
};

export default Brews;
