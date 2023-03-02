import React from 'react';
import styled from 'styled-components';

const CreatedBy = () => {
	return (
		<StyledCreatedBy>
			<p>Created by</p>
			<img
				src='https://res.cloudinary.com/dcfqlsnzh/image/upload/v1677786080/r2d8vy44g9eg7vdsyn7r.png'
				alt='signature'
			/>
		</StyledCreatedBy>
	);
};

export default CreatedBy;

const StyledCreatedBy = styled.div`
	padding: 8px 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;

	p {
		width: fit-content;
	}
	img {
		width: 64px;
	}
`;
