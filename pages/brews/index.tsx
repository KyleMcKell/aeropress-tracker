import type { NextPage } from 'next';
import Link from 'next/link';

const Brews: NextPage = () => {
	return (
		<div>
			<h1>Brews</h1>
			<Link href="/brews/new">New Brew</Link>
		</div>
	);
};

export default Brews;
