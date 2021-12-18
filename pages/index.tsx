import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
	const { data: session, status } = useSession();
	if (status === 'authenticated' && session) {
		return (
			<div style={{ backgroundColor: 'slateblue' }}>
				{console.log('hello')}
				Signed in as {session.user?.email} <br />
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
