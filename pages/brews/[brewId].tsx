import { AeropressBrew, User } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import useSWR from 'swr';
import axios from 'axios';

import prisma from '~/utils/prisma';

interface Props {
	brew: AeropressBrew;
}

const getUserFetcher = (url: string) => axios.get(url).then((res) => res.data);

const Brew: NextPage<Props> = ({ brew }: Props) => {
	const { data, error } = useSWR(`/api/user/${brew.userId}`, getUserFetcher);

	return (
		<div>
			<h1>{brew.name}</h1>
			{brew.description && <h2>{brew.description}</h2>}
			{data && <p>This brew was made by {data.user.name}</p>}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.brewId;

	const brew = await prisma.aeropressBrew.findUnique({
		where: { id: parseInt(String(id)) },
	});

	return {
		props: { brew },
	};
};

export default Brew;
