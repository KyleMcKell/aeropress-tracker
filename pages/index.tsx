import type { NextPage } from 'next';

import { useSession } from 'next-auth/react';

import Layout from '~/components/Layout';
import LinkButton from '~/components/LinkButton';
import LogInButton from '~/components/LogInButton';

const Home: NextPage = () => {
	const { status } = useSession();

	return (
		// Default description does a good job explaining this page
		<Layout title={'AeroPress Tracker'}>
			<h1 className="text-neutral-800 dark:text-neutral-200 font-bold text-2xl sm:text-3xl text-center">
				Welcome to AeroPress Tracker!
			</h1>
			<nav className="flex flex-col sm:flex-row gap-8 items-center pt-8">
				<LinkButton href="/brews">All Brews</LinkButton>

				<LinkButton href="/new">Create a New Brew</LinkButton>

				{(status === 'unauthenticated' || status === 'loading') && (
					<LogInButton />
				)}
				{status === 'authenticated' && (
					<LinkButton href="/profile">Profile</LinkButton>
				)}
			</nav>
		</Layout>
	);
};

export default Home;
