import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { AeropressBrew } from '@prisma/client';

import { ParsedUrlQuery } from 'querystring';

import prisma from '~/lib/db';

import Layout from '~/components/Layout';
import BrewCard from '~/components/BrewCard';

interface Props {
	brew: AeropressBrew;
}

const Brew: NextPage<Props> = ({ brew }: Props) => {
	return (
		<Layout title={`${brew.name} - AeroPress Tracker`} description="">
			<BrewCard brew={brew} />
		</Layout>
	);
};

interface Params extends ParsedUrlQuery {
	brewId: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
	params,
}) => {
	const { brewId } = params!;

	const numBrewId = parseInt(brewId);

	if (Number.isNaN(numBrewId)) {
		return {
			notFound: true,
		};
	}

	const brew = await prisma.aeropressBrew.findUnique({
		where: { id: numBrewId },
	});

	if (!brew) return { notFound: true };

	return {
		props: { brew },
		revalidate: 1,
	};
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const brews = await prisma.aeropressBrew.findMany();

	const paths = brews.map((brew: AeropressBrew) => ({
		params: { brewId: String(brew.id) },
	}));

	return { paths, fallback: 'blocking' };
};

export default Brew;
