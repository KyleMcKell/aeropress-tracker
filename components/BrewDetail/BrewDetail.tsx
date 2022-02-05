import type { ReactNode } from 'react';

interface Props {
	label: string;
	children: ReactNode;
}

const BrewDetail = ({ label, children }: Props) => {
	return (
		<div className="flex flex-col items-center gap-1">
			<h3 className="font-medium ">{label}</h3>
			<p className="rounded-full text-xl flex items-center justify-center font-semibold w-full px-4 py-2 bg-neutral-100 text-neutral-900 dark:bg-neutral-200 dark:text-black ">
				{children}
			</p>
		</div>
	);
};

export default BrewDetail;
