import React from 'react';

import Button from '../Button';
import { useSession, signIn, signOut } from 'next-auth/react';

interface Props {
	variant?: 'boring' | 'nifty' | 'primary' | 'secondary';
}

const LogInButton = ({ variant = 'boring' }: Props) => {
	const { data: session, status } = useSession();

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
		<Button onClick={handleClick} variant={variant}>
			{status === 'authenticated' ? <>Log Out</> : <>Log In</>}
		</Button>
	);
};

export default LogInButton;
