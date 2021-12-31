import Head from 'next/head';
import Image from 'next/image';
import useDarkMode from 'use-dark-mode';
import { useState } from 'react';

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
	const { value: darkModeValue, toggle } = useDarkMode(false, {
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
			<Header openMobileMenu={() => setShowMobileMenu(true)} />
			<main
				id="main-content"
				className="py-8 px-2 sm:px-4 flex flex-col justify-center items-center"
			>
				{children}
			</main>
			<footer className="w-full h-full -z-10 fixed bottom-0 left-0 right-0">
				<Image
					src={`/footer-waves-${darkModeValue ? 'dark' : 'light'}.svg`}
					objectFit={'cover'}
					layout="fill"
					alt=""
				/>
			</footer>
			<MobileMenu
				isOpen={showMobileMenu}
				onDismiss={() => setShowMobileMenu(false)}
			/>
		</div>
	);
};

export default Layout;
