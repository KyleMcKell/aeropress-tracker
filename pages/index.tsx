import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession, signIn, signOut } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			session: await getSession(context),
		},
	};
};

const Home: NextPage = () => {
	const { data: session, status } = useSession();
	if (status === 'authenticated') {
		return (
			<div style={{ backgroundColor: 'slateblue' }}>
				Signed in as {session?.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</div>
		);
	}
	if (status === 'unauthenticated') {
		return (
			<>
				Not signed in <br />
				<button onClick={() => signIn()}>Sign in</button>
			</>
		);
	}
	if (status === 'loading') {
		return <div>Loading...</div>;
	}
	return <div>Error</div>;
};

export default Home;
