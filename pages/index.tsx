import type { NextPage } from 'next';

import { useSession } from 'next-auth/react';

import Layout from '~/components/Layout';
import LinkButton from '~/components/LinkButton';
import LogInButton from '~/components/LogInButton';

const Home: NextPage = () => {
	const { status } = useSession();

	return (
		<Layout title={'AeroPress Tracker'}>
			<nav className="flex flex-col sm:flex-row gap-8 items-center">
				<LinkButton href="/brew">All Brews</LinkButton>

				<LinkButton href="/brew/new">Create a New Brew</LinkButton>

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
