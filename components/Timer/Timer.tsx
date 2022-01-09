import { useTimer } from 'react-timer-hook';
import useSound from 'use-sound';

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
	const [playTimerEnd] = useSound('/sounds/synth-dong.mp3');

	const { seconds, minutes, pause, resume, isRunning, restart } = useTimer({
		expiryTimestamp: getExpiryTimestamp(time),
		autoStart: false,
		onExpire: () => {
			playTimerEnd();
		},
	});

	return (
		<div className="shadow-sm shadow-neutral-800 flex flex-row justify-between gap-4 items-center border-4 border-neutral-600 dark:border-neutral-200 rounded-2xl p-4 sm:px-8 bg-neutral-100 dark:bg-neutral-600 -mx-2 -mb-2 sm:m-0">
			<div className="flex justify-start gap-1 items-baseline font-medium">
				<span className="text-6xl text-neutral-800 dark:text-neutral-100">
					{minutes}
				</span>
				<span className="text-4xl text-neutral-800 dark:text-neutral-100">
					:
				</span>
				<span className="text-5xl text-neutral-800 dark:text-neutral-100">{`${
					seconds < 10 ? '0' : ''
				}${seconds}`}</span>
			</div>
			<div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 translate-y-1">
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
