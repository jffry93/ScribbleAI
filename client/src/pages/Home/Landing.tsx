import { Button, Typography } from '@mui/material';
import React, { useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VideoBg from '../../components/VideoBg';
import { device } from '../../GlobalStyles';
import { useAuthContext } from '../../hooks/useAuthContext';
import landingVideo from '/landing-Large 540p.mp4';
import landingVideoMobile from '/landingMobile-Large-540p.mp4';

const Landing = () => {
	const {
		state: { user },
	} = useAuthContext();
	const navigate = useNavigate();

	return (
		<StyledContent>
			<StyledLanding>
				<Typography variant='h4'>
					Instantly sound professional, no matter the situation
				</Typography>
				<StyledButtonContainer>
					<Button
						onClick={() => {
							navigate('/signup');
						}}
					>
						SIGN UP
					</Button>
					<Button
						onClick={() => {
							navigate('/login');
						}}
					>
						LOGIN
					</Button>
				</StyledButtonContainer>
			</StyledLanding>
		</StyledContent>
	);
};

export default Landing;

const StyledContent = styled.div`
	min-height: var(--container-height);
	/* padding: var(--layout-padding); */
	flex-direction: column;
	/* width: 100vw; */
	max-width: var(--width-limit);
	position: relative;
	flex-direction: row;

	@media ${device.mobile} {
		flex-direction: column;
	}
`;

const StyledLanding = styled.div`
	position: absolute;
	bottom: 55px;
	margin: 0 32px;
	/* padding: var(--lg-padding); */

	justify-content: center;
	max-width: 600px;
	flex: 1;
	@media ${device.mobile} {
		padding: 0;
		/* left: 24px; */
		bottom: 32px;
	}
`;

export const StyledButtonContainer = styled.div`
	margin: var(--md-padding) 0 31px;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	button {
		flex: 1;
		width: 100%;
		max-width: 150px;
		min-width: 130px;
		border-radius: 30px;
	}
`;
