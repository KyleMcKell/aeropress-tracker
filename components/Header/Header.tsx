import { Session } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Button from '../Button';
import Icon from '../Icon';
import Logo from '../Logo';
import VisuallyHidden from '../VisuallyHidden';

interface Props {}

interface SignInProps {
	status: 'authenticated' | 'loading' | 'unauthenticated';
	session: Session | null;
}

const HeaderUserData = ({ status, session }: SignInProps) => {
	const handleClick = () => {
		switch (status) {
			case 'authenticated': {
				signOut();
			}
			case 'unauthenticated': {
				signIn();
			}
		}
	};

	return (
		<div className="hidden sm:flex flex-row gap-8 font-ui font-medium items-baseline">
			<div className="">
				{status === 'authenticated' ? (
					<>Hello {session?.user?.name.split(' ')[0]}!</>
				) : (
					<>Hello Barista!</>
				)}
			</div>
			<Button onClick={handleClick} variant="boring">
				{status === 'authenticated' ? <>Log Out</> : <>Log In</>}
			</Button>
		</div>
	);
};

const Header = (props: Props) => {
	const { data: session, status } = useSession();

	return (
		<div className="grid place-items-center bg-stone-100">
			{/* <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 w-full" /> */}
			<div className="bg-stone-500 h-2 w-full" />
			<div className="text-stone-700 flex justify-between items-baseline w-full px-8 pt-8 pb-4 border-b-4 border-stone-200 sm:px-12 md:w-10/12">
				<Link href="/" passHref>
					<a>
						<Logo />
					</a>
				</Link>
				<HeaderUserData status={status} session={session} />
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
