import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaGithubAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { StyledFlexCenter } from '../GlobalStyles';

const Banner = () => {
	return (
		<StyledBanner>
			<p>See more projects on </p>
			<a href='https://github.com/jffry93' target='_blank'>
				<FaGithubAlt />
				Github
			</a>
		</StyledBanner>
	);
};

export default Banner;

const StyledBanner = styled.div`
	position: relative;
	z-index: 1;
	backdrop-filter: blur(15px);
	background-color: rgba(0, 0, 0, 0.5);
	padding: 4.6px var(--md-padding) 3px;
	text-align: center;
	display: flex;
	justify-content: center;
	gap: 8px;
	p {
		font-size: 15px;
	}
	span {
		/* display: flex; */
	}
	a {
		display: flex;
		align-items: center;
		gap: 4px;
		cursor: pointer;
		&:active,
		&:hover {
			color: rgb(110, 84, 148);
		}
	}
`;
