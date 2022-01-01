import Head from 'next/head';
import useDarkMode from 'use-dark-mode';
import { useState } from 'react';

import Header from '~/components/Header';
import JumpToContent from '../JumpToContent';
import MobileMenu from '../MobileMenu';
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
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const { value: darkModeValue, toggle: toggleDarkMode } = useDarkMode(false, {
		classNameDark: 'dark',
		classNameLight: 'light',
	});

	return (
		<div
			className={`font-ui relative h-full bg-white dark:bg-black isolate ${
				darkModeValue ? 'dark' : 'light'
			}`}
		>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<JumpToContent />
			<Header
				openMobileMenu={() => setShowMobileMenu(true)}
				toggleDarkMode={toggleDarkMode}
				darkModeValue={darkModeValue}
			/>
			<main
				id="main-content"
				className="py-8 px-2 sm:px-4 flex flex-col justify-center items-center"
			>
				{children}
			</main>
			<Footer darkModeValue={darkModeValue} />
			<MobileMenu
				isOpen={showMobileMenu}
				onDismiss={() => setShowMobileMenu(false)}
				toggleDarkMode={toggleDarkMode}
				darkModeValue={darkModeValue}
			/>
		</div>
	);
};

export default Layout;
