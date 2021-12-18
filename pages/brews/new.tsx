import type { NextPage } from 'next';
import { useBrew } from '~/utils/hooks/useBrew';

const CreateBrew: NextPage = () => {
	// this will currently fail to load as there is no brew with id asdf
	const { brew, isLoading, isError } = useBrew('asdf');

	if (isError) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	// render data
	return <div>hello {brew.name}!</div>;
};

export default CreateBrew;
