import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Banner from './Banner';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<StyledLayout>
			<Banner />
			<Navbar />
			<StyledMain>{children}</StyledMain>
			<Footer />
		</StyledLayout>
	);
};

export default Layout;

const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
const StyledMain = styled.main`
	width: 100%;
	min-height: var(--container-height);
`;
