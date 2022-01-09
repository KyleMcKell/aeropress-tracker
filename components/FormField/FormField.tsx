import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	extraClasses?: string;
}

const FormField = ({ children, extraClasses }: Props) => {
	return (
		<div className={`flex flex-col bg-none pb-1 gap-1 ${extraClasses}`}>
			{children}
		</div>
	);
};

export default FormField;
