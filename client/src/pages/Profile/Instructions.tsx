import React from 'react';
import styled from 'styled-components';

const Instructions = () => {
	return (
		<StyledInstructions>
			<p>Click on the 🔒 and add information to get personalized responses</p>
			<p>Update info when done.</p>
		</StyledInstructions>
	);
};

export default Instructions;

const StyledInstructions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	text-align: center;

	margin: auto;
	span {
		color: var(--primary);
	}
`;
