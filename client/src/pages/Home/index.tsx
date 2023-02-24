import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VideoBg from '../../components/VideoBg';
import { StyledMain } from '../../GlobalStyles';
import desktopVideo from '/penHome-Large-540p.mp4';
import mobileVideo from '/penHomeMobile-540p.mp4';

const Home = () => {
	const navigate = useNavigate();
	// const VideoBg = React.lazy(() => import('../../components/VideoBg'));
	return (
		<StyledContent>
			<StyledContainer>
				<h1>Save Time and Apply to More Jobs</h1>
				<p>
					Searching for the perfect job can be overwhelming, so we designed a
					platform that not only simplifies the application process.
				</p>
				<p>Say goodbye to tedious job applications.</p>

				<button onClick={() => navigate('/nsfw')}>Get Started</button>
			</StyledContainer>

			<VideoBg desktopVideo={desktopVideo} mobileVideo={mobileVideo} />
		</StyledContent>
	);
};

export default Home;

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
	h1 {
		margin-bottom: 24px;
	}
	button {
		margin-top: 24px;
		max-width: 200px;
		border-radius: 30px;
		padding-left: var(--sm-padding);
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
	span {
		color: var(--primary);
	}

	ul {
		padding-left: 24px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
`;
