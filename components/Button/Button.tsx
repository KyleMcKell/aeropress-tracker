import React from 'react';

interface Props {
	onClick: () => void;
	children: React.ReactNode;
	variant: 'boring' | 'nifty' | 'primary' | 'secondary';
}

const Button = ({ onClick, children, variant, ...delegated }: Props) => {
	let variantClasses: string;
	switch (variant) {
		case 'boring':
			variantClasses =
				'bg-gray-500 text-white transition-colors hover:bg-gray-600';
			break;
		case 'nifty':
			variantClasses =
				'bg-gradient-to-tr text-white text-opacity-100 from-primary-600 to-secondary-500 opacity-90 transition-opacity hover:opacity-100';
			break;
		case 'primary':
			variantClasses =
				'bg-primary-600 text-white transition-colors hover:bg-primary-700';
			break;
		case 'secondary':
			variantClasses =
				'bg-secondary-700 text-white transition-colors ease-in hover:bg-secondary-800';
			break;
		default:
			variantClasses =
				'bg-gray-500 text-white transition-colors hover:bg-gray-600';
			break;
	}

	return (
		<>
			<button
				className={`px-6 py-2 font-semibold font-ui text-base rounded-full duration-200 ease-in motion-reduce:transition-none ${variantClasses}`}
				onClick={onClick}
				{...delegated}
			>
				{children}
			</button>
		</>
	);
};

export default Button;
