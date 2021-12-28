import React from 'react';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

interface Props {}

const Spinner = (props: Props) => {
	return (
		<div className="animate-spin-slow">
			<Icon id="loader" strokeWidth={2} />
			<VisuallyHidden>Loading</VisuallyHidden>
		</div>
	);
};

export default Spinner;
