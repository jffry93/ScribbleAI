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
			<h4>{label}:</h4>
			{(label.toLowerCase() === 'personality' && text) ||
			(label.toLowerCase() === 'experience' && text) ? (
				<p>{text ? text : 'N/A'}</p>
			) : (
				<p>{text ? text : 'N/A'}</p>
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
	padding: var(--sm-padding);
	min-width: 400px;
	h4 {
		font-size: 20px;
		min-width: 110px;
	}
	p {
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
