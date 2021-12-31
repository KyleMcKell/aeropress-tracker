import { useSession, signIn, signOut } from 'next-auth/react';

import Button from '../Button';

interface Props {
	variant?: 'boring' | 'nifty' | 'primary' | 'secondary';
}

const LogInButton = ({ variant = 'boring' }: Props) => {
	const { status } = useSession();

	const handleClick = () => {
		switch (status) {
			case 'authenticated': {
				return signOut();
			}
			case 'unauthenticated': {
				return signIn();
			}
			case 'loading': {
				return;
			}
		}
	};

	if (status === 'loading') {
		<Button variant={variant}>Loading</Button>;
	}

	return (
		<Button onClick={handleClick} variant={variant}>
			{status === 'authenticated' ? <>Log Out</> : <>Log In</>}
		</Button>
	);
};

export default LogInButton;
