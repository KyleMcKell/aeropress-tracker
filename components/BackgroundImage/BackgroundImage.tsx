import Image from 'next/image';

interface Props {
	darkModeValue: boolean;
}

const BackgroundImage = ({ darkModeValue }: Props) => {
	return (
		<div className="w-full h-full -z-10 fixed bottom-0 left-0 right-0">
			<Image
				draggable={false}
				src={`/svg/footer-waves-${darkModeValue ? 'dark' : 'light'}.svg`}
				objectFit={'cover'}
				layout="fill"
				alt=""
			/>
		</div>
	);
};

export default BackgroundImage;
