import type { NextPage, GetServerSideProps } from 'next';
import type { AeropressBrew } from '@prisma/client';

import { getSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

import prisma from '~/lib/db';

import Button from '~/components/Button';
import Layout from '~/components/Layout';
import BrewCard from '~/components/BrewCard';

interface Props {
	brews: AeropressBrew[];
}

const Profile: NextPage<Props> = ({ brews }: Props) => {
	const [brewsToRender, _] = useState(brews);

	return (
		<Layout title={'Brews'}>
			<div className="w-full md:w-5/6 flex flex-col justify-center items-center gap-8">
				<h1 className="text-4xl font-semibold text-neutral-900">Your Brews</h1>

				{(!brewsToRender || brewsToRender?.length === 0) && (
					<div>No Brews, sorry!</div>
				)}
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center items-stretch">
					{brewsToRender?.map((brew) => (
						<div key={brew.id} className="h-full">
							<Link href={`/brew/${brew.id}`} passHref>
								<a>
									<BrewCard brew={brew} showTimer={false} />
								</a>
							</Link>
						</div>
					))}
				</div>

				<Link href="/brew/new" passHref>
					<a href="href">
						<Button>Create a New Brew</Button>
					</a>
				</Link>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const session = await getSession(context);

	if (!session || !session.user) {
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
