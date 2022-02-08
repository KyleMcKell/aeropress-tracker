import type { NextPage, GetStaticProps } from 'next';
import type { AeropressBrew } from '@prisma/client';

import prisma from '~/lib/db';

import BrewGrid from '~/components/BrewGrid';
import Layout from '~/components/Layout';
import LinkButton from '~/components/LinkButton';

interface Props {
	brews: AeropressBrew[];
}

const Brews: NextPage<Props> = ({ brews }: Props) => {
	return (
		<Layout
			title={'Brews'}
			description={`List of all created brews to choose from for your AeroPress`}
		>
			<div className="w-full lg:w-11/12 flex flex-col justify-center items-center gap-8">
				<h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-200">
					Brews
				</h1>
				<BrewGrid brews={brews} />
				<LinkButton href="/new">Create a New Brew</LinkButton>
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const brews = await prisma.aeropressBrew.findMany({
		orderBy: { id: 'desc' },
	});

	return {
		props: {
			brews,
		},
		revalidate: 1,
	};
};

export default Brews;
