import Link from 'next/link';
import { useSession } from 'next-auth/react';

import Icon from '../Icon';
import LogInButton from '../LogInButton';
import Logo from '../Logo';
import VisuallyHidden from '../VisuallyHidden';
import ThemeSwitchButton from '../ThemeSwitchButton';

interface Props {
	openMobileMenu: () => void;
	toggleDarkMode: () => void;
	isDarkMode: boolean;
}

const Header = ({ openMobileMenu, toggleDarkMode, isDarkMode }: Props) => {
	const { data: session, status } = useSession();

	return (
		<header className="grid place-items-center">
			{/* <div className="bg-gradient-to-r from-primary-300 to-secondary-300 h-2 w-full" /> */}
			<div className="bg-neutral-500 dark:bg-neutral-800 h-2 w-full" />
			<div className="flex justify-between items-baseline w-full p-4 px-4 border-b-4 border-neutral-200 sm:p-8 sm:pb-6 md:w-10/12">
				<Link href="/" passHref>
					<a>
						<Logo />
					</a>
				</Link>
				{/* desktop log in info */}
				<div className="hidden sm:flex flex-row gap-6 font-ui font-semibold items-baseline">
					<p className="text-lg flex items-center justify-center h-10 text-neutral-700 dark:text-neutral-200">
						{status === 'authenticated' ? (
							<Link href="/profile" passHref>
								<a href="">Hello {session?.user?.name.split(' ')[0]}!</a>
							</Link>
						) : (
							<>Hello Barista!</>
						)}
					</p>

					<div className="min-w-28 flex items-center justify-center h-10">
						<LogInButton />
					</div>

					<ThemeSwitchButton
						isDarkMode={isDarkMode}
						toggleDarkMode={toggleDarkMode}
					/>
				</div>
				{/* mobile menu button */}
				<button
					className="sm:hidden self-center text-neutral-700 dark:text-neutral-200"
					onClick={openMobileMenu}
				>
					<Icon id={'menu'} strokeWidth={2} />
					<VisuallyHidden>Menu</VisuallyHidden>
				</button>
			</div>
		</header>
	);
};

export default Header;
