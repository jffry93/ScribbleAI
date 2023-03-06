import { CircularProgress, Typography } from '@mui/material';
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
				<Typography variant='h2'>{title}</Typography>
				<Typography>{subtitle}</Typography>
			</StyledContent>
			<CircularProgress />
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

	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const StyledContent = styled(StyledFlexCenter)`
	flex-direction: column;
	gap: 24px;
	padding: var(--lg-padding);
	p {
		text-align: center;
	}
`;
