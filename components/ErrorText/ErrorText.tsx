import VisuallyHidden from '../VisuallyHidden';

interface Props {
	error: string;
	descriptiveHiddenError?: string;
}

const ErrorText = ({ error, descriptiveHiddenError }: Props) => (
	<>
		<span
			role="alert"
			className="text-danger-700 dark:text-danger-300 text-sm font-semibold"
		>
			{error}
		</span>
		<VisuallyHidden>{descriptiveHiddenError}</VisuallyHidden>
	</>
);

export default ErrorText;
