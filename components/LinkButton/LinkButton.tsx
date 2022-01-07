import type { ReactNode } from 'react';

import Link from 'next/link';

import Button from '../Button';

interface Props {
	href: string;
	children: ReactNode;
	onClick?: () => void;
	variant?: 'boring' | 'nifty' | 'primary' | 'secondary';
}

const LinkButton = ({ href, onClick, variant = 'boring', children }: Props) => (
	<Link href={href} passHref>
		<a tabIndex={-1}>
			<Button onClick={onClick} variant={variant}>
				{children}
			</Button>
		</a>
	</Link>
);

export default LinkButton;
