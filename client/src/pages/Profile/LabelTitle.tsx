import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { device } from '../../GlobalStyles';

const LabelTitle = ({
	label,
	text,
}: {
	label: string;
	text: string | null | undefined;
}) => {
	return (
		<StyledLabelTitle>
			<Typography variant='h6'>{label}:</Typography>
			{(label.toLowerCase() === 'personality' && text) ||
			(label.toLowerCase() === 'experience' && text) ? (
				<Typography>{text ? text : 'N/A'}</Typography>
			) : (
				<Typography>{text ? text : 'N/A'}</Typography>
			)}
		</StyledLabelTitle>
	);
};

export default LabelTitle;

const StyledLabelTitle = styled.div`
	display: flex;
	align-items: flex-start;

	justify-content: space-between;
	gap: 8px;
	padding: var(--sm-padding) 0;
	min-width: 400px;
	h6 {
		font-size: 18px;
		min-width: 110px;
	}
	p {
		margin-top: 2px;
		width: 100%;
		color: var(--secondary-text-color);
	}
	@media ${device.mobile} {
		& {
			display: flex;
			flex-direction: column;
			min-width: 200px;
		}
	}
`;
