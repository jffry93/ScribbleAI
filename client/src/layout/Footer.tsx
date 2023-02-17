import React from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { device } from '../GlobalStyles';

const Footer = () => {
	return (
		<StyledFooter>
			<Logo size={100} />
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
