import type { AeropressBrew } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useUser } from '.';

const useCheckOwnership = (brew: AeropressBrew) => {
	const { data: session } = useSession();
	const { user: ownerName } = useUser(brew.userId);
	const isOwner = session?.userId === brew.userId;

	return { isOwner, ownerName };
};

export default useCheckOwnership;
