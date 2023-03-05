import styled from 'styled-components';

export interface ErrorProps {
	msg: string;
	status: null | boolean;
}

const ErrorMsg = ({ data }: { data: ErrorProps }) => {
	const { msg, status } = data;
	return (
		<>
			{status && (
				<StyledError>
					<span>{msg}</span>
				</StyledError>
			)}
		</>
	);
};

export default ErrorMsg;

const StyledError = styled.div`
	padding: 4px var(--sm-padding);
	border: 1px solid var(--error);
	border-radius: 4px;
	text-align: center;
	width: 100%;
	font-size: 22px;
	color: var(--error);
`;
