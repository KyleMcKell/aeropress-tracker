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
				'bg-stone-500 text-white transition-colors hover:bg-stone-600';
			break;
		case 'nifty':
			variantClasses =
				'bg-gradient-to-tr text-white text-opacity-100 from-purple-700 to-cyan-500 opacity-80 transition-opacity hover:opacity-100';
			break;
		case 'primary':
			variantClasses =
				'bg-purple-600 text-white transition-colors hover:bg-purple-700';
			break;
		case 'secondary':
			variantClasses =
				'bg-cyan-700 text-white transition-colors ease-in hover:bg-cyan-800';
			break;
		default:
			variantClasses =
				'bg-stone-500 text-white transition-colors hover:bg-stone-600';
			break;
	}

	return (
		<>
			<button
				className={`px-6 py-2 font-medium font-ui rounded-2xl duration-200 ease-in motion-reduce:transition-none ${variantClasses}`}
				onClick={onClick}
				{...delegated}
			>
				{children}
			</button>
		</>
	);
};

export default Button;
