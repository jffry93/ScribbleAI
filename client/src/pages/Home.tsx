import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { StyledMain } from '../GlobalStyles';

const Home = () => {
	const navigate = useNavigate();
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
		</StyledContent>
	);
};

export default Home;

const StyledContainer = styled.div`
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
