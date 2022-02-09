import Image from 'next/image';

interface Props {
	isDarkMode: boolean;
}

const BackgroundImage = ({ isDarkMode }: Props) => {
	return (
		<div className="w-full h-full -z-10 fixed bottom-0 left-0 right-0">
			<Image
				draggable={false}
				src={`/svg/footer-waves-${isDarkMode ? 'dark' : 'light'}.svg`}
				objectFit={'cover'}
				layout="fill"
				// I don't believe this needs an alt text as it is purely decoration
				alt=""
			/>
		</div>
	);
};

export default BackgroundImage;
