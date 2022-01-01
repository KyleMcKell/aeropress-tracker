import Image from 'next/image';

interface Props {
	darkModeValue: boolean;
}

const Footer = ({ darkModeValue }: Props) => {
	return (
		<footer className="w-full h-full -z-10 fixed bottom-0 left-0 right-0">
			<Image
				src={`/svg/footer-waves-${darkModeValue ? 'dark' : 'light'}.svg`}
				objectFit={'cover'}
				layout="fill"
				alt=""
			/>
		</footer>
	);
};

export default Footer;
