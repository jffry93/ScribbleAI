const FormInput = ({
	state,
	setState,
	placeholder,
}: {
	state: string | undefined;
	setState: Function;
	placeholder: string;
}) => {
	return (
		<input
			placeholder={placeholder}
			value={state}
			onChange={(e) => {
				setState(e.target.value);
			}}
		/>
	);
};

export default FormInput;
