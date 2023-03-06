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
			<h1>Scribble AI</h1>
		</StyledLogo>
	);
};

export default Logo;

const StyledLogo = styled(Link)<MyLinkProps>`
	display: flex;
	align-items: center;
	position: relative;
	color: var(--text-color);

	&:hover {
		color: var(--primary);
		img {
			filter: invert(34%) sepia(52%) saturate(617%) hue-rotate(198deg)
				brightness(94%) contrast(91%);
		}
	}
	&:active {
		img {
			filter: invert(34%) sepia(52%) saturate(617%) hue-rotate(198deg)
				brightness(94%) contrast(91%);
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
