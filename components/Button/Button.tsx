import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'boring' | 'nifty' | 'primary' | 'secondary';
}

const Button = ({
	onClick,
	children,
	variant = 'boring',
	...delegated
}: Props) => {
	let variantStyles: string;
	switch (variant) {
		case 'boring':
			variantStyles =
				'bg-neutral-600 text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800';
			break;
		case 'nifty':
			variantStyles =
				'bg-gradient-to-tr text-white text-opacity-100 from-primary-600 to-secondary-500 opacity-90 transition-opacity hover:opacity-100';
			break;
		case 'primary':
			variantStyles =
				'bg-primary-400 text-white transition-colors hover:bg-primary-600';
			break;
		case 'secondary':
			variantStyles =
				'bg-secondary-700 text-white transition-colors ease-in hover:bg-secondary-900';
			break;
	}

	return (
		<button
			className={`px-6 py-2 font-semibold font-ui text-base rounded-full duration-200 ease-in motion-reduce:transition-none ${variantStyles}`}
			onClick={onClick}
			{...delegated}
		>
			{children}
		</button>
	);
};

export default Button;
