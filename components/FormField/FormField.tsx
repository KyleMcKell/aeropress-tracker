import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const FormField = ({ children }: Props) => {
	return <div className="flex flex-col bg-none pb-1 gap-1">{children}</div>;
};

export default FormField;
