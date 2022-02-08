import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuthReroute = (route: string = '/') => {
	const router = useRouter();
	const { status, data: session } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') router.push(route);
	}, [status, router, route]);

	return { status, session };
};

export default useAuthReroute;
