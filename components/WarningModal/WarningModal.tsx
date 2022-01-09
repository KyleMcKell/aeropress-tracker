import type { ReactNode, Dispatch, SetStateAction } from 'react';

import { DialogContent, DialogOverlay } from '@reach/dialog';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

interface Props {
	ariaLabel: string;
	children: ReactNode;
	setShowWarning: Dispatch<SetStateAction<boolean>>;
	showWarning: boolean;
}

const WarningModal = ({
	children,
	showWarning,
	setShowWarning,
	ariaLabel,
}: Props) => {
	return (
		<DialogOverlay
			isOpen={showWarning}
			onDismiss={() => setShowWarning(false)}
			className="fixed inset-0 h-full w-full flex justify-center items-center bg-neutral-800 bg-opacity-40 dark:bg-black dark:bg-opacity-80"
		>
			<DialogContent
				className="font-ui shadow-lg shadow-neutral-800 dark:shadow-md flex justify-between gap-4 bg-neutral-100 border-4 border-neutral-800 dark:border-neutral-300 dark:bg-neutral-900 flex-col py-4 px-8 rounded-lg"
				aria-label={ariaLabel}
			>
				<button
					onClick={() => setShowWarning(false)}
					className="self-end -mr-4 text-neutral-900 dark:text-white"
				>
					<Icon id="close" strokeWidth={4} />
					<VisuallyHidden>Dismiss Menu</VisuallyHidden>
				</button>
				{children}
			</DialogContent>
		</DialogOverlay>
	);
};

export default WarningModal;
