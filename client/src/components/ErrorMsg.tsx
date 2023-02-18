import React from 'react';
import styled from 'styled-components';

const ErrorMsg = ({ msg }: { msg: string }) => {
	return (
		<StyledError>
			<p>{msg}</p>
		</StyledError>
	);
};

export default ErrorMsg;

const StyledError = styled.div`
	padding: 4px var(--sm-padding);
	border: 1px solid var(--error);
	border-radius: 4px;
	color: var(--error);
	text-align: center;
`;
