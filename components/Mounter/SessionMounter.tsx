import { useSession } from 'next-auth/react';
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

interface Props {
	children: React.ReactNode;
}

// const useIsMounted = () => {
// 	const isMountedRef = useRef(true);
// 	const isMounted = useCallback(() => isMountedRef.current, []);

// 	useEffect(() => {
// 		return () => void (isMountedRef.current = false);
// 	}, []);

// 	return isMounted;
// };

const SessionMounter = ({ children }: Props) => {
	const { status } = useSession();
	const [mounted, setMounted] = useState(false);

	useLayoutEffect(() => {
		if (status !== 'loading') {
			setMounted(true);
		}
	}, [status]);

	// const isMounted = useIsMounted();

	return <>{mounted && children}</>;
};

export default SessionMounter;
