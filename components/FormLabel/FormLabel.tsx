import type { ReactNode } from 'react';

interface Props {
	htmlFor: string;
	isRequired?: boolean;
	children: ReactNode;
}

const FormLabel = ({ htmlFor, isRequired = false, children }: Props) => {
	return (
		<label htmlFor={htmlFor} className="font-semibold pl-4">
			{children}
			{isRequired && <span className="font-bold">*</span>}
		</label>
	);
};

export default FormLabel;
