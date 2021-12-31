import type { ReactNode } from 'react';

import { useState, useEffect } from 'react';

interface Props {
	children: ReactNode;
}

const VisuallyHidden = ({ children, ...delegated }: Props) => {
	const [forceShow, setForceShow] = useState(false);

	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			const handleKeyDown = (ev: KeyboardEvent) => {
				if (ev.key === 'Alt') {
					setForceShow(true);
				}
			};

			const handleKeyUp = () => {
				setForceShow(false);
			};

			window.addEventListener('keydown', handleKeyDown);
			window.addEventListener('keyup', handleKeyUp);

			return () => {
				window.removeEventListener('keydown', handleKeyDown);
				window.removeEventListener('keydown', handleKeyUp);
			};
		}
		return;
	}, []);

	if (forceShow) {
		return <>{children}</>;
	}

	return (
		<div
			className="absolute overflow-hidden h-px w-px -m-px p-0 border-0 [clip:rect(0 0 0 0)]"
			{...delegated}
		>
			{children}
		</div>
	);
};

export default VisuallyHidden;
