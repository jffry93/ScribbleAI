import React from 'react';
import styled from 'styled-components';
import { StyledFlexCenter } from '../GlobalStyles';
import reactLogo from '../assets/react.svg';
import typescriptLogo from '../assets/typescript.svg';

const Home = () => {
	return (
		<div>
			<StyledLogos>
				<a>
					<img src='/vite.svg' className='logo' alt='Vite logo' />
				</a>
				<a>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
				<a>
					<img
						src={typescriptLogo}
						className='logo typescript'
						alt='React logo'
					/>
				</a>
			</StyledLogos>
		</div>
	);
};

export default Home;

const StyledLogos = styled(StyledFlexCenter)`
	flex-wrap: wrap;
`;
