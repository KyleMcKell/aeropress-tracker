import React from 'react';
import { useTimer } from 'react-timer-hook';
import Button from '../Button';

interface Props {
	time: number;
}

const getExpiryTimestamp = (time: number) => {
	const expiryTimestamp = new Date();
	expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + time);
	return expiryTimestamp;
};

const Timer = ({ time }: Props) => {
	const { seconds, minutes, pause, resume, isRunning, restart } = useTimer({
		expiryTimestamp: getExpiryTimestamp(time),
		autoStart: false,
	});

	return (
		<div className="flex flex-row justify-between items-center border-4 border-neutral-600 rounded-2xl p-4 sm:px-8 bg-neutral-100 -mx-2 -mb-2 sm:m-0">
			<div className="flex justify-start gap-1 items-baseline font-medium">
				<span className="text-6xl text-neutral-800">{minutes}</span>
				<span className="text-4xl text-neutral-800">:</span>
				<span className="text-5xl text-neutral-800">{`${
					seconds < 10 ? '0' : ''
				}${seconds}`}</span>
			</div>
			<div className="flex flex-col sm:flex-row justify-end gap-4 translate-y-1">
				<Button
					variant="boring"
					onClick={() => {
						restart(getExpiryTimestamp(time), false);
					}}
				>
					Reset
				</Button>
				{isRunning ? (
					<Button variant="boring" onClick={pause}>
						Pause
					</Button>
				) : (
					<Button variant="boring" onClick={resume}>
						Start
					</Button>
				)}
			</div>
		</div>
	);
};

export default Timer;
