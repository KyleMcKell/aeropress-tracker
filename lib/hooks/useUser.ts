import useSWR from 'swr';
import { User } from '@prisma/client';

type UserHookData = {
	user?: User;
	isLoading: boolean;
	isError: boolean;
};

type UserPayload = {
	user?: User;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useUser = (id: number | undefined): UserHookData => {
	const userId = String(id);
	const { data, error } = useSWR<UserPayload>(`/api/user/${userId}`, fetcher);

	const user = data?.user;

	if (!id) {
		return { isLoading: false, isError: false, user: undefined };
	}

	return {
		user,
		isLoading: !error && !data,
		isError: Boolean(error),
	};
};

export default useUser;
