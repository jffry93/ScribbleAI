import styled from 'styled-components';
import { StyledFlexCenter } from '../GlobalStyles';

const LoadingModal = () => {
	return (
		<StyledLoadingModal>
			<StyledContent>
				<h1>Loading...</h1>
				<p>Please be patient while the data is being processed.</p>
			</StyledContent>
		</StyledLoadingModal>
	);
};

export default LoadingModal;

const StyledLoadingModal = styled(StyledFlexCenter)`
	backdrop-filter: blur(5px);
	background-color: rgba(0, 0, 0, 0.6);
	height: 100vh;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
`;

const StyledContent = styled(StyledFlexCenter)`
	flex-direction: column;
`;
