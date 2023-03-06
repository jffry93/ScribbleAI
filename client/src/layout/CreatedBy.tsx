import { Link, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const CreatedBy = () => {
	return (
		<StyledCreatedBy>
			<StyledText>
				<Link href='https://jffry93.github.io/react-portfolio/' target='_blank'>
					<span>Created by</span>
					<img
						src='https://res.cloudinary.com/dcfqlsnzh/image/upload/v1677786080/r2d8vy44g9eg7vdsyn7r.png'
						alt='signature'
					/>
				</Link>
			</StyledText>
		</StyledCreatedBy>
	);
};

export default CreatedBy;

const StyledCreatedBy = styled.div`
	padding: 8px 32px;
`;

const StyledText = styled(Typography)`
	cursor: pointer;
	a {
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		img {
			width: 64px;
		}
	}
	a:hover {
		img {
			filter: invert(34%) sepia(52%) saturate(617%) hue-rotate(198deg)
				brightness(94%) contrast(91%);
		}
	}
`;
