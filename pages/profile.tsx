import type { NextPage, GetServerSideProps } from 'next';
import type { AeropressBrew } from '@prisma/client';

import { getSession } from 'next-auth/react';

import prisma from '~/lib/db';

import BrewCardGrid from '~/components/BrewCardGrid';
import Layout from '~/components/Layout';
import LinkButton from '~/components/LinkButton';

interface Props {
	brews: AeropressBrew[];
}

const Profile: NextPage<Props> = ({ brews }: Props) => {
	return (
		<Layout title={'Brews'}>
			<div className="w-full lg:w-11/12 flex flex-col justify-center items-center gap-8">
				<h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-200">
					Your Brews
				</h1>
				<BrewCardGrid brews={brews} />
				<LinkButton href="/brew/new">Create a New Brew</LinkButton>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const session = await getSession(context);

	if (!session || !session.user || !session.userId) {
		return { props: { brews: [], session } };
	}

	const { userId } = session;

	const brews = await prisma.aeropressBrew.findMany({
		where: {
			userId,
		},
		take: 10,
	});

	return {
		props: {
			brews,
			session,
		},
	};
};

export default Profile;
