import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuthReroute = () => {
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/');
	}, [status, router]);
};

export default useAuthReroute;
