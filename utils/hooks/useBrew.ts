import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useBrew = (id: string) => {
	const { data, error } = useSWR(`/api/brew/${id}`, fetcher);

	return {
		brew: data,
		isLoading: !error && !data,
		isError: error,
	};
};
