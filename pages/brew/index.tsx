import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '~/components/Button';
import Layout from '~/components/Layout';
import useSWR from 'swr';
import { AeropressBrew } from '@prisma/client';
import BrewCard from '~/components/BrewCard';

type BrewPayload = {
	brews?: AeropressBrew[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Brews: NextPage = () => {
	const { data, error } = useSWR<BrewPayload>('/api/brew', fetcher);

	const brews = data?.brews;

	return (
		<Layout title={'Brews'}>
			<div className="w-full md:w-5/6 flex flex-col justify-center items-center gap-8">
				<h1 className="text-4xl font-semibold text-neutral-900">Brews</h1>

				{(!brews || brews?.length === 0) && <div>No Brews, sorry!</div>}
				{error && <div>Failed to load</div>}
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
					{brews?.map((brew) => (
						<div key={brew.id} className="">
							<Link href={`/brew/${brew.id}`} passHref>
								<a>
									<BrewCard brew={brew} showTimer={false} />
								</a>
							</Link>
						</div>
					))}
				</div>

				<Link href="/brew/new" passHref>
					<a href="href">
						<Button>Create a New Brew</Button>
					</a>
				</Link>
			</div>
		</Layout>
	);
};

export default Brews;
