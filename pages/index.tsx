import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from '~/components/Button';
import Layout from '~/components/Layout';
import LogInButton from '~/components/LogInButton';

const Home: NextPage = () => {
	const { data: session, status } = useSession();

	return (
		<Layout title={'AeroPress Tracker'}>
			<div className="flex flex-col sm:flex-row gap-8 items-center">
				<Link href="/brew" passHref>
					<a>
						<Button>All Brews</Button>
					</a>
				</Link>

				<Link href="/brew/new" passHref>
					<a>
						<Button>Create a New Brew</Button>
					</a>
				</Link>

				{status === 'loading' && <Button>Profile</Button>}
				{status === 'unauthenticated' && <LogInButton />}
				{status === 'authenticated' && (
					<Link href="/profile" passHref>
						<a>
							<Button>Profile</Button>
						</a>
					</Link>
				)}
			</div>
		</Layout>
	);
};

export default Home;
