import React from 'react';
import styled from 'styled-components';

const LabelTitle = ({ label, text }: { label: string; text: string }) => {
	return (
		<StyledLabelTitle>
			<p>{label} :</p>
			<h4>{text}</h4>
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
