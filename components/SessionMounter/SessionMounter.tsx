import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

interface Props {
	children: React.ReactNode;
}

const SessionMounter = ({ children }: Props) => {
	const { status } = useSession();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (status !== 'loading') {
			setMounted(true);
		}
	}, [status]);

	return <>{mounted && children}</>;
};

export default SessionMounter;
