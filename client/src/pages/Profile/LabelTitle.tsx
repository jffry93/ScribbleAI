import React from 'react';
import styled from 'styled-components';

const LabelTitle = ({
	label,
	text,
}: {
	label: string;
	text: string | null | undefined;
}) => {
	return (
		<StyledLabelTitle>
			<p>{label} :</p>
			{(label.toLowerCase() === 'personality' && text) ||
			(label.toLowerCase() === 'experience' && text) ? (
				<p>{text ? text : 'N/A'}</p>
			) : (
				<h4>{text ? text : 'N/A'}</h4>
			)}
		</StyledLabelTitle>
	);
};

export default LabelTitle;

const StyledLabelTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid yellow;
	padding: var(--sm-padding);
`;
