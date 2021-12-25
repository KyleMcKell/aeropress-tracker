import React from 'react';

interface Props {
	time: number;
}

const Timer = ({ time }: Props) => {
	return (
		<div>
			<h3>This will be a timer for {time} seconds</h3>
		</div>
	);
};

export default Timer;
