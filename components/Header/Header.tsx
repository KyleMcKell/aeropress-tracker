import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Icon from '../Icon';
import LogInButton from '../LogInButton';
import Logo from '../Logo';
import VisuallyHidden from '../VisuallyHidden';

interface Props {}

const Header = (props: Props) => {
	const { data: session, status } = useSession();

	return (
		<div className="grid place-items-center">
			{/* <div className="bg-gradient-to-r from-primary-300 to-secondary-300 h-2 w-full" /> */}
			<div className="bg-neutral-500 h-2 w-full" />
			<div className="text-neutral-700 flex justify-between items-baseline w-full px-8 pt-8 pb-4 border-b-4 border-neutral-200 md:w-10/12">
				<Link href="/" passHref>
					<a>
						<Logo />
					</a>
				</Link>
				{/* desktop log in info */}
				<div className="hidden sm:flex flex-row gap-8 font-ui font-semibold items-baseline">
					<div className="text-lg">
						{status === 'authenticated' ? (
							<>Hello {session?.user?.name.split(' ')[0]}!</>
						) : (
							<>Hello Barista!</>
						)}
					</div>
					<LogInButton />
				</div>
				{/* mobile menu button */}
				<button className="sm:hidden self-center">
					<Icon id={'menu'} strokeWidth={2} />
					<VisuallyHidden>Menu</VisuallyHidden>
				</button>
			</div>
		</div>
	);
};

export default Header;
