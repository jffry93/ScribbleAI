import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { StyledPage } from '../GlobalStyles';
import Banner from './Banner';
import ClipBoard from './ClipBoard';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<StyledReset>
			<StyledLayout>
				<Banner />
				<Navbar />
				<StyledMain>{children}</StyledMain>
			</StyledLayout>
			<ClipBoard />
			<Footer />
		</StyledReset>
	);
};

export default Layout;
const StyledReset = styled.div`
	height: 100%;
`;
const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 100vh;
`;
const StyledMain = styled(StyledPage)`
	width: 100%;
	height: 100%;
	min-height: var(--container-height);
`;
