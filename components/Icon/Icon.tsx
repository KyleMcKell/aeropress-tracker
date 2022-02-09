import {
	Menu,
	Loader,
	X,
	Sun,
	Moon,
	Coffee,
	Trash2,
	MoreHorizontal,
} from 'react-feather';

interface Props {
	id:
		| 'menu'
		| 'loader'
		| 'close'
		| 'sun'
		| 'moon'
		| 'coffee'
		| 'trash'
		| 'more';
	color?: string;
	size?: string | number;
	strokeWidth?: string | number;
	fill?: string;
}

const icons = {
	menu: Menu,
	loader: Loader,
	close: X,
	sun: Sun,
	moon: Moon,
	coffee: Coffee,
	trash: Trash2,
	more: MoreHorizontal,
};

const Icon = ({
	id,
	color,
	size,
	strokeWidth,
	fill = 'none',
	...delegated
}: Props) => {
	const Component = icons[id];

	if (!Component) {
		throw new Error(`No icon found for ID: ${id}`);
	}

	return (
		<Component
			className="block"
			color={color}
			size={size}
			strokeWidth={strokeWidth}
			fill={fill}
			{...delegated}
		/>
	);
};

export default Icon;
