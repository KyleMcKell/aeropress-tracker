import Head from 'next/head';
import React, { useState } from 'react';

import Header from '~/components/Header';
import JumpToContent from '../JumpToContent';
import MobileMenu from '../MobileMenu';

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
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	return (
		<div className="font-ui relative">
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<JumpToContent />
			<Header openMobileMenu={() => setShowMobileMenu(true)} />
			<main
				id="main-content"
				className="py-8 px-2 sm:px-4 flex flex-col justify-center items-center"
			>
				{children}
			</main>
			<MobileMenu
				isOpen={showMobileMenu}
				onDismiss={() => setShowMobileMenu(false)}
			/>
		</div>
	);
};

export default Layout;
