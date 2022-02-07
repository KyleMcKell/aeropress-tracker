import type { NextPage, GetServerSideProps } from 'next';
import type { AeropressBrew } from '@prisma/client';

import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import prisma from '~/lib/db';

import BrewCardGrid from '~/components/BrewGrid';
import Layout from '~/components/Layout';
import LinkButton from '~/components/LinkButton';
import { useEffect } from 'react';

interface Props {
	brews: AeropressBrew[];
}

const Profile: NextPage<Props> = ({ brews }: Props) => {
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/');
	}, [status, router]);

	return (
		<Layout title={'Brews'}>
			<div className="w-full lg:w-11/12 flex flex-col justify-center items-center gap-8">
				<h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-200">
					Your Brews
				</h1>
				<BrewCardGrid brews={brews} />
				<LinkButton href="/new">Create a New Brew</LinkButton>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const session = await getSession(context);

	if (!session || !session.user || !session.userId) {
		return { props: { brews: [] } };
	}

	const { userId } = session;

	const brews = await prisma.aeropressBrew.findMany({
		where: {
			userId,
		},
		orderBy: {
			id: 'desc',
		},
		take: 10,
	});

	return {
		props: {
			brews,
		},
	};
};

export default Profile;
