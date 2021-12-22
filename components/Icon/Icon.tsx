import React from 'react';
import { Menu } from 'react-feather';

interface Props {
	id: 'menu';
	color?: string;
	size?: string | number;
	strokeWidth?: string | number;
}

const icons = {
	menu: Menu,
};

const Icon = ({ id, color, size, strokeWidth, ...delegated }: Props) => {
	const Component = icons[id];

	if (!Component) {
		throw new Error(`No icon found for ID: ${id}`);
	}

	return (
		<div {...delegated}>
			<Component
				className="block"
				color={color}
				size={size}
				strokeWidth={strokeWidth}
			/>
		</div>
	);
};

export default Icon;