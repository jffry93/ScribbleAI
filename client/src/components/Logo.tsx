import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../GlobalStyles';

interface MyLinkProps extends LinkProps {
	width?: number;
	font?: number;
}

const Logo = ({ size, font = 51.2 }: { size: number; font?: number }) => {
	return (
		<StyledLogo to={`/`} width={size} font={font}>
			<img src='/feather.png' />
			<h1>ProfessionalPen</h1>
		</StyledLogo>
	);
};

export default Logo;

const StyledLogo = styled(Link)<MyLinkProps>`
	display: flex;
	align-items: center;
	position: relative;

	z-index: 200;

	&:hover {
		color: var(--text-color);
		/* --secondary-text-color */
		/* img {
			filter: invert(35%) sepia(85%) saturate(561%) hue-rotate(201deg)
				brightness(113%) contrast(108%);
		} */
	}
	&:active {
		img {
			filter: invert(35%) sepia(85%) saturate(561%) hue-rotate(201deg)
				brightness(113%) contrast(108%);
		}
	}
	h1 {
		font-size: ${(props) => {
			return props.font + 'px';
		}};
	}
	img {
		width: ${(props) => {
			return props.width + 'px';
		}};
		filter: invert(98%) sepia(1%) saturate(143%) hue-rotate(354deg)
			brightness(119%) contrast(78%);
	}
	@media ${device.mobile} {
		h1 {
			display: none;
		}
	}
`;
