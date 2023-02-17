import { Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	device,
	StyledButtonContainer,
	StyledFlexCenter,
	StyledPage,
} from '../GlobalStyles';
import { useAuthContext } from '../hooks/useAuthContext';

const Landing = () => {
	const {
		state: { user },
	} = useAuthContext();
	const navigate = useNavigate();
	return (
		<StyledContent>
			<StyledLanding>
				<StyledLogo>
					<h1>ProfessionalPen</h1>
					<img src='../../public/feather.png' />
				</StyledLogo>
				<h2>
					Never send an unprofessional email again with our AI-powered tool
				</h2>
				<StyledButtonContainer>
					<button
						onClick={() => {
							navigate('/signup');
						}}
					>
						Signup
					</button>
					<button
						onClick={() => {
							navigate('/login');
						}}
					>
						Login
					</button>
				</StyledButtonContainer>
			</StyledLanding>
			<StyledSocialProof>
				<h1>Coming soon...</h1>
			</StyledSocialProof>
		</StyledContent>
	);
};

export default Landing;

const StyledContent = styled(StyledPage)`
	/* min-height: var(--container-height); */
	flex-direction: row;

	@media ${device.mobile} {
		flex-direction: column;
	}
`;

const StyledLogo = styled.div`
	display: flex;
	align-items: center;
	h1 {
		font-size: clamp(44px, 8vw, 60px);
	}

	img {
		width: 100px;
		filter: invert(100%) sepia(4%) saturate(638%) hue-rotate(275deg)
			brightness(112%) contrast(80%);
	}
	@media ${device.mobile} {
		flex-direction: column-reverse;
		padding-bottom: var(--lg-padding);
		img {
			width: 160px;
		}
	}
`;

const StyledLanding = styled(StyledPage)`
	padding: 0 32px;
	justify-content: center;
	min-height: 400px;
	max-width: var(--container-width-limit);
	flex: 1;
	@media ${device.mobile} {
		padding: 0;
	}
`;
const StyledSocialProof = styled(StyledFlexCenter)`
	flex: 1;
`;
