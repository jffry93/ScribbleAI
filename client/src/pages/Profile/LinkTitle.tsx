import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const LinkTitle = ({
	label,
	text,
}: {
	label: string;
	text: string | null | undefined;
}) => {
	const textRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const truncateText = () => {
			const element = textRef.current;

			if (!element) {
				return;
			}

			const isTruncated = element.scrollWidth > element.clientWidth;

			if (isTruncated) {
				element.setAttribute('title', text || 'N/A');
			} else {
				element.removeAttribute('title');
			}
		};

		truncateText();
		window.addEventListener('resize', truncateText);
		return () => window.removeEventListener('resize', truncateText);
	}, [text]);

	return (
		<StyledLinkTitle>
			<Typography variant='h6'>{label}:</Typography>
			<Typography ref={textRef}>{text ? text : 'N/A'}</Typography>
		</StyledLinkTitle>
	);
};

export default LinkTitle;

const StyledLinkTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	padding: var(--sm-padding) var(--sm-padding) var(--sm-padding) 0;
	width: 100%;
	min-width: 60px;
	h6 {
		font-size: 18px;
	}

	p {
		/* color: var(--secondary-text-color); */
		white-space: nowrap;

		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 90%;
	}
`;
