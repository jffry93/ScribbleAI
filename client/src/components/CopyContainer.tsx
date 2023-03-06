import { Button, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import styled from 'styled-components';
import { StyledFlexCenter, StyledIconContainer } from '../GlobalStyles';
import { copyClipboard } from '../util/copyClipboard';
interface CopyProps {
	appropriateMsg: string | undefined;
}
const CopyContainer = ({ appropriateMsg }: CopyProps) => {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<>
			{appropriateMsg && (
				<StyledCopy
					onClick={async () => {
						if (appropriateMsg) {
							copyClipboard(appropriateMsg);
							setIsVisible(true);
							await new Promise((resolve) => setTimeout(resolve, 1000));
							setIsVisible(false);
						} else {
							console.log('nothing to copy');
						}
					}}
				>
					<StyledCopyButton>
						<Tooltip title='Copied' placement='left' open={isVisible}>
							<IconButton>
								<FaCopy />
							</IconButton>
						</Tooltip>
					</StyledCopyButton>
					<pre>{appropriateMsg}</pre>
				</StyledCopy>
			)}
		</>
	);
};

export default CopyContainer;

const StyledCopy = styled(StyledFlexCenter)`
	/* min-height: 300px; */
	flex: 1;
	padding: var(--md-padding);
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	position: relative;

	pre {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-x: auto;
	}
`;

const StyledCopyButton = styled.div`
	position: absolute;
	top: var(--sm-padding);
	right: var(--sm-padding);
`;
