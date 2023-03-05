import React, { useState } from 'react';
import { FaClipboardList, FaGithubAlt, FaLinkedinIn } from 'react-icons/fa';
import styled from 'styled-components';
import { ImProfile } from 'react-icons/im';
import { AiOutlineLink } from 'react-icons/ai';
import { copyClipboard } from '../util/copyClipboard';
import { useAuthContext } from '../hooks/useAuthContext';
import { BsPlusLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ClipBoard = () => {
	const [isVisible, setIsVisible] = useState(false);

	const {
		state: { user },
	} = useAuthContext();
	const navigate = useNavigate();

	return (
		<StyledClipBoard>
			{isVisible && (
				<StyledIconContainer>
					{user?.preference.links.github && (
						<button
							onClick={() => {
								copyClipboard(user?.preference.links.github);
							}}
						>
							<FaGithubAlt size={25} />
						</button>
					)}
					{user?.preference.links.linkedin && (
						<button
							onClick={() => {
								copyClipboard(user?.preference.links.linkedin);
							}}
						>
							<FaLinkedinIn size={25} />
						</button>
					)}
					{user?.preference.links.additional && (
						<button
							onClick={() => {
								copyClipboard(user?.preference.links.additional);
							}}
						>
							<AiOutlineLink size={25} />
						</button>
					)}
					{user?.preference.links &&
						Object.keys(user?.preference.links).length === 0 && (
							<button
								onClick={() => {
									navigate('/profile');
								}}
							>
								<BsPlusLg size={25} />
							</button>
						)}
				</StyledIconContainer>
			)}
			<StyledClipButton onClick={() => setIsVisible(!isVisible)}>
				<FaClipboardList size={25} />
			</StyledClipButton>
		</StyledClipBoard>
	);
};

export default ClipBoard;

const StyledClipBoard = styled.div`
	position: fixed;
	z-index: 1;
	bottom: var(--md-padding);
	right: var(--md-padding);
`;

const StyledClipButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 12px 14px;
	height: 60px;
	width: 60px;
	border-radius: 50%;
`;

const StyledIconContainer = styled.div`
	display: flex;
	flex-direction: column-reverse;
	justify-content: center;
	gap: var(--sm-padding);
	margin: var(--sm-padding) 0;
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 12px;
		height: 60px;
		width: 60px;
		border-radius: 50%;
	}
`;
