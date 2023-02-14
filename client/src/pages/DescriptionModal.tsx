import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { StyledFlexCenter } from '../GlobalStyles';

interface Props {
	details: JSX.Element;
	setDisplay: Dispatch<SetStateAction<boolean>>;
}
const DescriptionModal: React.FC<Props> = ({ details, setDisplay }) => {
	return (
		<StyledMain onClick={() => setDisplay(false)}>
			<StyledRelative>
				<h1>Instructions</h1>
				<StyledContent>{details}</StyledContent>
				<p className='close'>Click anywhere to close tab</p>
			</StyledRelative>
		</StyledMain>
	);
};

export default DescriptionModal;

const StyledMain = styled.div`
	position: fixed;
	top: 0;
	z-index: 10;
	height: 100vh;
	width: 100vw;
	backdrop-filter: blur(10px);
	background-color: rgba(0, 0, 0, 0.9);
	display: flex;
	align-items: center;
	justify-content: center;
	.flex {
		display: flex;
		flex-direction: column;
		align-items: centers;
		justify-content: center;
	}
`;

const StyledRelative = styled(StyledFlexCenter)`
	flex-direction: column;
	gap: 32px;
	padding: var(--layout-padding);
	border: 1px solid var(--primary);
	h2 {
		padding-top: 24px;
	}
	.close {
		padding-top: 48px;
	}
`;

const StyledContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;

	width: 300px;
	text-align: center;
`;
