import React from 'react';

interface Props {
	/** I hate reaching for this here,
	 * but I couldn't find how to type
	 * children correctly without having
	 * to use a React Fragment*/
	children: any;
}

const VisuallyHidden = ({ children, ...delegated }: Props) => {
	const [forceShow, setForceShow] = React.useState(false);

	React.useEffect(() => {
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
	}, []);

	if (forceShow) {
		return children;
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
