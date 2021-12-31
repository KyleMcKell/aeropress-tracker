import Link from 'next/link';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { useSession } from 'next-auth/react';

import Icon from '../Icon';
import LinkButton from '../LinkButton';
import LogInButton from '../LogInButton';
import Logo from '../Logo';
import VisuallyHidden from '../VisuallyHidden';

interface Props {
	isOpen: boolean;
	onDismiss: () => void;
}

const MobileMenu = ({ isOpen, onDismiss }: Props) => {
	const { status } = useSession();

	return (
		<DialogOverlay
			isOpen={isOpen}
			onDismiss={onDismiss}
			className="fixed inset-0 h-full w-full flex justify-end bg-neutral-800 bg-opacity-40 dark:bg-black dark:bg-opacity-80"
		>
			<DialogContent
				aria-label="menu content"
				className="relative flex justify-between bg-neutral-100 dark:bg-neutral-900 w-80 h-full flex-col p-8"
			>
				<button
					onClick={onDismiss}
					className="self-end -mr-4 text-neutral-900 dark:text-white"
				>
					<Icon id="close" strokeWidth={4} />
					<VisuallyHidden>Dismiss Menu</VisuallyHidden>
				</button>

				<Link href="/">
					<a className="self-center" tabIndex={-1}>
						<button onClick={onDismiss}>
							<Logo />
						</button>
					</a>
				</Link>

				<nav className="flex flex-col sm:flex-row gap-8 items-center">
					{(status === 'unauthenticated' || status === 'loading') && (
						<button onClick={onDismiss}>
							<LogInButton />
						</button>
					)}
					{status === 'authenticated' && (
						<LinkButton href="/profile" onClick={onDismiss}>
							Profile
						</LinkButton>
					)}

					<LinkButton href="/brew" onClick={onDismiss}>
						All Brews
					</LinkButton>

					<LinkButton href="/brew/new" onClick={onDismiss}>
						Create a New Brew
					</LinkButton>
				</nav>
			</DialogContent>
		</DialogOverlay>
	);
};

export default MobileMenu;
