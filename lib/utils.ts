export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) return error.message;
	return String(error);
};
