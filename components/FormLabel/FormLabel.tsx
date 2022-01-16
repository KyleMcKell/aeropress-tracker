import type { ReactNode } from 'react';

interface Props {
	htmlFor: string;
	isRequired?: boolean;
	unitName?: string;
	children: ReactNode;
}

const FormLabel = ({
	htmlFor,
	unitName,
	isRequired = false,
	children,
}: Props) => {
	return (
		<label
			htmlFor={htmlFor}
			className="font-semibold px-4 w-full flex justify-between items-baseline"
		>
			<span>
				{children} {isRequired && <span className="font-bold">*</span>}
			</span>
			{unitName && <span className="text-xs">{unitName}</span>}
		</label>
	);
};

export default FormLabel;
