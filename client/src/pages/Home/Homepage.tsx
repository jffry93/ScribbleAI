import { Button, Typography } from '@mui/material';
import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VideoBg from '../../components/VideoBg';
import { StyledMain } from '../../GlobalStyles';
import { useAuthContext } from '../../hooks/useAuthContext';
import desktopVideo from '/penHome-Large-540p.mp4';
import mobileVideo from '/penHomeMobile-540p.mp4';

const Homepage = () => {
	const navigate = useNavigate();
	const {
		state: { user },
	} = useAuthContext();

	const [startRoute, setStartRoute] = useState(() => {
		if (user?.preference?.experience) {
			return '/nsfw';
		} else {
			return '/profile';
		}
	});
	return (
		<StyledContent>
			<StyledContainer>
				<Typography variant='h3'>Save Time and Apply to More Jobs</Typography>
				<Typography variant='h6' sx={{ pl: 0.5 }}>
					Searching for the perfect job can be overwhelming, so I developed a
					platform that streamlines the application process, allowing for a
					quick and effortless experience.
				</Typography>
				<Typography variant='h6' sx={{ pl: 0.5 }}>
					Say goodbye to tedious job applications.
				</Typography>

				<Button onClick={() => navigate(startRoute)}>Get Started</Button>
			</StyledContainer>
		</StyledContent>
	);
};

export default Homepage;

const StyledContainer = styled.div`
	/* pointer-events: none; */
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 16px;
	padding: var(--layout-padding);
	min-height: var(--container-height);
	h3 {
		margin-bottom: 8px;
	}

	button {
		margin-top: 24px;
		max-width: 200px;
		border-radius: 30px;
	}
`;
const StyledContent = styled(StyledMain)`
	justify-content: center;
	gap: 32px;
	min-height: var(--container-height);
	max-width: 600px;
	p,
	li {
		padding-left: var(--sm-padding);
		color: var(--secondary-text-color);
	}

	ul {
		padding-left: 24px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
`;
