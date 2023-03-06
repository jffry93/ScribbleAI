import React, { useState } from 'react';
import {
	Box,
	FormControlLabel,
	Grow,
	IconButton,
	Switch,
	Tooltip,
} from '@mui/material';
import { FaClipboardList, FaGithubAlt, FaLinkedinIn } from 'react-icons/fa';
import styled from 'styled-components';

import { AiOutlineLink } from 'react-icons/ai';
import { copyClipboard } from '../util/copyClipboard';
import { useAuthContext } from '../hooks/useAuthContext';
import { BsPlusLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
const buttonData = {
	github: () => <FaGithubAlt size={25} />,
	linkedin: () => <FaLinkedinIn size={25} />,
	additional: () => <AiOutlineLink size={25} />,
};
type Data = 'github' | 'linkedin' | 'additional';

const ClipBoard = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentIndex, setCurrentIndex] = useState<undefined | number>(
		undefined
	);
	const {
		state: { user },
	} = useAuthContext();
	const navigate = useNavigate();
	const buttonKeys = Object.keys(user?.preference?.links || {});

	return (
		<StyledClipBoard>
			{isVisible && (
				<StyledIconContainer>
					{buttonKeys.map((data: string, index: number) => {
						console.log(data);
						return (
							<Grow
								key={index + data}
								style={{ transformOrigin: '0 0 0' }}
								{...(isVisible ? { timeout: 500 * index } : {})}
								in={isVisible}
							>
								<Tooltip
									title='Copied'
									placement='left'
									open={index === currentIndex}
								>
									<IconButton
										sx={{ p: 2 }}
										onClick={async () => {
											if (user && data in user.preference.links) {
												copyClipboard(user.preference.links[data as Data]);
												setCurrentIndex(index);
												await new Promise((resolve) =>
													setTimeout(resolve, 1000)
												);
												setCurrentIndex(undefined);
											}
										}}
									>
										{buttonData[data as Data]()}
									</IconButton>
								</Tooltip>
							</Grow>
						);
					})}

					{user?.preference.links &&
						Object.keys(user?.preference.links).length === 0 && (
							<Grow
								style={{ transformOrigin: '0 0 0' }}
								{...(isVisible ? { timeout: 500 } : {})}
								in={isVisible}
							>
								<IconButton
									sx={{ p: 2 }}
									onClick={() => {
										navigate('/profile');
										window.scrollTo(0, 0);
									}}
								>
									<BsPlusLg size={25} />
								</IconButton>
							</Grow>
						)}
				</StyledIconContainer>
			)}
			<Tooltip title='Copy to clipboard' placement='left'>
				<IconButton sx={{ p: 2 }} onClick={() => setIsVisible(!isVisible)}>
					<FaClipboardList size={25} />
				</IconButton>
			</Tooltip>
		</StyledClipBoard>
	);
};

export default ClipBoard;

const StyledClipBoard = styled.div`
	position: fixed;
	z-index: 1;
	bottom: var(--md-padding);
	right: var(--md-padding);

	width: 60px;
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
