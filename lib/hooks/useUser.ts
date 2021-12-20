import useSWR from 'swr';
import { User } from '@prisma/client';

import { fetcher } from '~/lib/utils';

type UserHookData = {
	user?: User;
	isLoading: boolean;
	isError: any;
};

type UserPayload = {
	user?: User;
};

const useUser = (id: number): UserHookData => {
	const userId = String(id);
	const { data, error } = useSWR<UserPayload>(`/api/user/${userId}`, fetcher);

	const user = data?.user;

	return {
		user,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useUser;
