import { Typography } from '@mui/material';
import React from 'react';
import { FaLock } from 'react-icons/fa';
import styled from 'styled-components';

const Instructions = () => {
	return (
		<StyledInstructions>
			<Typography variant='h6'>
				Click on the <FaLock size={'20'} /> and add information to get
				personalized responses
			</Typography>
			<Typography variant='h6'>Update info when done.</Typography>
		</StyledInstructions>
	);
};

export default Instructions;

const StyledInstructions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	text-align: center;
	max-width: 600px;

	margin: auto;
`;
