import React from 'react';
import styled from 'styled-components';

const Banner = () => {
	return (
		<StyledBanner>
			<p>Banner</p>
		</StyledBanner>
	);
};

export default Banner;

const StyledBanner = styled.div`
	background-color: #2d2d2d;
	padding: 4.6px var(--md-padding) 3px;
	text-align: center;
	p {
		font-size: 15px;
	}
`;
