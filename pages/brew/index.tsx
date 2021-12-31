import type { NextPage, GetStaticProps } from 'next';
import type { AeropressBrew } from '@prisma/client';

import prisma from '~/lib/db';

import BrewCardGrid from '~/components/BrewCardGrid';
import Layout from '~/components/Layout';
import LinkButton from '~/components/LinkButton';

interface Props {
	brews: AeropressBrew[];
}

const Brews: NextPage<Props> = ({ brews }: Props) => {
	return (
		<Layout title={'Brews'}>
			<div className="w-full md:w-5/6 flex flex-col justify-center items-center gap-8">
				<h1 className="text-4xl font-semibold text-neutral-900">Brews</h1>
				<BrewCardGrid brews={brews} />
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
