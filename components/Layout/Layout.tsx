import Head from 'next/head';
import useDarkMode from 'use-dark-mode';
import { useState } from 'react';

import Header from '~/components/Header';
import JumpToContent from '../JumpToContent';
import MobileMenu from '../MobileMenu';
import Footer from '../Footer';
import BackgroundImage from '../BackgroundImage';

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
	const { value: isDarkMode, toggle: toggleDarkMode } = useDarkMode(true, {
		classNameDark: 'dark',
		classNameLight: 'light',
	});

	return (
		<div
			className={`font-ui relative h-full bg-white dark:bg-black isolate ${
				isDarkMode ? 'dark' : 'light'
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
				isDarkMode={isDarkMode}
			/>
			<main
				id="main-content"
				className="py-8 px-2 sm:px-4 flex flex-col justify-center items-center"
			>
				{children}
			</main>
			<Footer />
			<MobileMenu
				isOpen={showMobileMenu}
				onDismiss={() => setShowMobileMenu(false)}
				toggleDarkMode={toggleDarkMode}
				isDarkMode={isDarkMode}
			/>
			<BackgroundImage isDarkMode={isDarkMode} />
		</div>
	);
};

export default Layout;
