interface Props {
	error: string;
}

const ErrorText = ({ error }: Props) => (
	<span
		role="alert"
		className="text-danger-700 dark:text-danger-200 text-sm font-semibold"
	>
		{error}
	</span>
);

export default ErrorText;
