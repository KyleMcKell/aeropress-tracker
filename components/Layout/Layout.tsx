import Head from 'next/head';
import React from 'react';

import Header from '~/components/Header';
import SessionMounter from '~/components/SessionMounter';
import Footer from '../Footer';

interface Props {
	title: string;
	description?: string;
	children: React.ReactNode;
}

const Layout = ({
	title,
	description = 'An app to help with making AeroPress Coffee',
	children,
}: Props) => {
	return (
		<div className="font-ui">
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SessionMounter>
				<Header />
				<div className="pt-8 px-2 sm:px-4 flex flex-col justify-center items-center">
					{children}
				</div>
				<Footer />
			</SessionMounter>
		</div>
	);
};

export default Layout;
