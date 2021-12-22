import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { AeropressBrew } from '@prisma/client';

import { ParsedUrlQuery } from 'querystring';
import { useUser } from '~/lib/hooks';

import prisma from '~/lib/prisma';
import Layout from '~/components/Layout';
import Head from 'next/head';

interface Props {
	brew: AeropressBrew;
}

const Brew: NextPage<Props> = ({ brew }: Props) => {
	const { user } = useUser(brew.userId);

	return (
		<>
			<Head>
				<title>{`${brew.name} - AeroPress Tracker`}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<h1>{brew.name}</h1>
				{brew.description && <h2>{brew.description}</h2>}
				{user && <p>This brew was made by {user.name}</p>}
			</Layout>
		</>
	);
};

interface Params extends ParsedUrlQuery {
	brewId: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
	params,
}) => {
	const { brewId } = params!;

	const brew = await prisma.aeropressBrew.findUnique({
		where: { id: parseInt(brewId) },
	});

	if (!brew) return { notFound: true };

	return {
		props: { brew },
		revalidate: 10,
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
