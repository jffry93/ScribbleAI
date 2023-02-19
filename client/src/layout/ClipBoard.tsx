import React, { useState } from 'react';
import { FaClipboardList, FaGithubAlt, FaLinkedinIn } from 'react-icons/fa';
import styled from 'styled-components';
import { ImProfile } from 'react-icons/im';
import { AiOutlineLink } from 'react-icons/ai';
import { copyClipboard } from '../util/copyClipboard';

const ClipBoard = () => {
	const [isVisible, setIsVisible] = useState(false);
	const linksArray = [
		{
			title: 'Github',
			icon: () => <FaGithubAlt size={25} />,
			address: 'https://github.com/jffry93',
		},
		{
			title: 'Linkedin',
			icon: () => <FaLinkedinIn size={25} />,
			address: 'https://www.linkedin.com/in/jffry93/',
		},
		{
			title: 'Portfolio',
			icon: () => <ImProfile size={25} />,
			address: 'https://jffry93.github.io/react-portfolio/',
		},
		{
			title: 'linktree',
			icon: () => <AiOutlineLink size={25} />,
			address: 'https://jffry-linktree.vercel.app/',
		},
	];
	return (
		<StyledClipBoard>
			{isVisible && (
				<StyledIconContainer>
					{linksArray.map((item) => {
						console.log('first');
						return (
							<button
								key={item.title}
								title={item.title}
								onClick={() => {
									copyClipboard(item.address);
									console.log(item.address);
								}}
							>
								{item.icon()}
							</button>
						);
					})}
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