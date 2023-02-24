import React, { useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VideoBg from '../components/VideoBg';
import { device } from '../GlobalStyles';
import { useAuthContext } from '../hooks/useAuthContext';
import landingVideo from '/landing-Large 540p.mp4';
import landingVideoMobile from '/landingMobile-Large-540p.mp4';

const Landing = () => {
	const {
		state: { user },
	} = useAuthContext();
	const navigate = useNavigate();

	return (
		<StyledContent>
			<VideoBg desktopVideo={landingVideo} mobileVideo={landingVideoMobile} />

			<StyledLanding>
				<h2>Instantly sound professional, no matter the situation</h2>
				<StyledButtonContainer>
					<button
						onClick={() => {
							navigate('/signup');
						}}
					>
						SIGN UP
					</button>
					<button
						onClick={() => {
							navigate('/login');
						}}
					>
						LOGIN
					</button>
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
	border: 1px solid blue;
	h2 {
		font-size: 40px;
	}
	/* background: url(${landingVideo}) no-repeat center center fixed;
	background-size: cover; */
	.video-background {
		/* border: 1px solid pink; */
		position: fixed;
		top: 0;
		left: 0;
		min-height: 100vh;
		width: 100%;
		overflow: hidden;
		video {
			min-width: 100%;
			min-height: 100%;
			width: auto;
			height: auto;
			z-index: -100;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.video-background:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
	}
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
	gap: 8px;
	button {
		max-width: 200px;
		border-radius: 30px;
	}
`;
