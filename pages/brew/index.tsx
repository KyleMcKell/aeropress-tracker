import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '~/components/Button';
import Layout from '~/components/Layout';

const Brews: NextPage = () => {
	return (
		<Layout title={'Brews'}>
			<h1>Brews</h1>

			<Link href="/brew/new" passHref>
				<a href="href">
					<Button>Create a New Brew</Button>
				</a>
			</Link>
		</Layout>
	);
};

export default Brews;
