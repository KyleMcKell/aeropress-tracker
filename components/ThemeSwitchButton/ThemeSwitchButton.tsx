import React from 'react';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

interface Props {
	toggleDarkMode: () => void;
	isDarkMode: boolean;
}

const ThemeSwitchButton = ({ toggleDarkMode, isDarkMode }: Props) => {
	return (
		<button
			onClick={toggleDarkMode}
			className="self-center text-neutral-700 dark:text-neutral-100"
		>
			<VisuallyHidden>Toggle dark mode</VisuallyHidden>
			{isDarkMode && <Icon id="sun" strokeWidth={2.5} />}
			{!isDarkMode && <Icon id="sun" strokeWidth={2.5} />}
		</button>
	);
};

export default ThemeSwitchButton;
