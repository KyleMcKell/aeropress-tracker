interface Props {
	error: string;
}

const ErrorText = ({ error }: Props) => (
	<span role="alert" className="text-danger-500 text-sm font-semibold">
		{error}
	</span>
);

export default ErrorText;
