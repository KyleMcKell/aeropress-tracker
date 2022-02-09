import VisuallyHidden from '../VisuallyHidden';

interface Props {
	error: string;
	descriptiveHiddenError?: string;
}

const ErrorText = ({ error, descriptiveHiddenError }: Props) => (
	<>
		<p
			role="alert"
			className="text-danger-700 dark:text-danger-300 text-sm font-semibold"
		>
			{error}
		</p>
		<VisuallyHidden>{descriptiveHiddenError}</VisuallyHidden>
	</>
);

export default ErrorText;
