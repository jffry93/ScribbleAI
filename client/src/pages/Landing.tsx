import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device, StyledFlexCenter, StyledPage } from '../GlobalStyles';
import { useAuthContext } from '../hooks/useAuthContext';

const Landing = () => {
	const {
		state: { user },
	} = useAuthContext();
	const navigate = useNavigate();
	return (
		<StyledContent>
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

const StyledContent = styled(StyledPage)`
	position: relative;
	flex-direction: row;
	h2 {
		font-size: 40px;
	}

	@media ${device.mobile} {
		flex-direction: column;
	}
`;

const StyledLanding = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	padding: var(--lg-padding);

	justify-content: center;
	max-width: 600px;
	flex: 1;
	@media ${device.mobile} {
		padding: 0;
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
