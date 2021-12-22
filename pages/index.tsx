import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '~/components/Layout';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>AeroPress Tracker</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<h1>Home Page</h1>
			</Layout>
		</>
	);
};

export default Home;
