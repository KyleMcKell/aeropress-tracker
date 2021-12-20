import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { AeropressBrew } from '@prisma/client';

import { ParsedUrlQuery } from 'querystring';
import { useUser } from '~/lib/hooks';

import prisma from '~/lib/prisma';

interface Props {
	brew: AeropressBrew;
}

const Brew: NextPage<Props> = ({ brew }: Props) => {
	const { user, isLoading, isError } = useUser(brew.userId);

	return (
		<div>
			<h1>{brew.name}</h1>
			{brew.description && <h2>{brew.description}</h2>}
			{user && <p>This brew was made by {user.name}</p>}
		</div>
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
