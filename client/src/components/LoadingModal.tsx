import { useEffect } from 'react';
import styled from 'styled-components';
import { StyledFlexCenter } from '../GlobalStyles';

const LoadingModal = ({
	title = 'Loading...',
	subtitle = 'Please be patient while the data is being processed.',
}: {
	title?: string;
	subtitle?: string;
}) => {
	useEffect(() => {
		// Add the scroll lock when the component mounts
		document.body.style.overflow = 'hidden';
		// Remove the scroll lock when the component unmounts
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);
	return (
		<StyledLoadingModal>
			<StyledContent>
				<h1>{title}</h1>
				<p>{subtitle}</p>
				<StyledLoadingDots>
					<span></span>
					<span></span>
					<span></span>
				</StyledLoadingDots>
			</StyledContent>
		</StyledLoadingModal>
	);
};

export default LoadingModal;

const StyledLoadingDots = styled.div``;

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
	gap: 24px;
	padding: var(--lg-padding);
	p {
		text-align: center;
	}
`;
