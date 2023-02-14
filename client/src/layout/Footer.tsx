import React from 'react';
import styled from 'styled-components';

const Footer = () => {
	return (
		<StyledFooter>
			<h1>Logo</h1>
		</StyledFooter>
	);
};

export default Footer;

const StyledFooter = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: var(--primary);
	padding: var(--layout-padding);
`;
