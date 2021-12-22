import { Session } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Icon from '../Icon';
import Logo from '../Logo';
import VisuallyHidden from '../VisuallyHidden';

interface Props {}

interface SignInProps {
	status: 'authenticated' | 'loading' | 'unauthenticated';
	session: Session | null;
}

const UserData = ({ status, session }: SignInProps) => {
	const handleClick = () => {
		switch (status) {
			case 'authenticated': {
				return signOut();
			}
			case 'unauthenticated': {
				return signIn();
			}
		}
	};

	return (
		<div className="hidden sm:flex flex-row gap-8 font-semibold items-baseline">
			<div className="">
				{status === 'authenticated' ? (
					<>Hello {session?.user?.name.split(' ')[0]}!</>
				) : (
					<>Hello Barista!</>
				)}
			</div>
			<button
				className="bg-stone-600 rounded-full px-5 py-2 font-semibold text-stone-50"
				onClick={handleClick}
			>
				{status === 'authenticated' ? <>Log Out</> : <>Log In</>}
			</button>
		</div>
	);
};

const Header = (props: Props) => {
	const { data: session, status } = useSession();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="grid place-items-center">
			<div className="border-t-4" />
			<div className="flex justify-between items-baseline w-full px-8 pt-5 pb-5 text-stone-700 border-b-2 border-stone-200 sm:px-12 md:w-10/12">
				<Logo />
				<UserData status={status} session={session} />
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
