import React from 'react';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

interface Props {
	toggleDarkMode: () => void;
	darkModeValue: boolean;
}

const ThemeSwitchButton = ({ toggleDarkMode, darkModeValue }: Props) => {
	return (
		<button
			onClick={toggleDarkMode}
			className="self-center text-neutral-700 dark:text-neutral-100"
		>
			<VisuallyHidden>Toggle dark mode</VisuallyHidden>
			<Icon id={darkModeValue ? 'moon' : 'sun'} strokeWidth={2.5} />
		</button>
	);
};

export default ThemeSwitchButton;
