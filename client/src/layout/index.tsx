import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VideoBg from '../components/VideoBg';
import { StyledPage } from '../GlobalStyles';
import { useAuthContext } from '../hooks/useAuthContext';
import Banner from './Banner';
import ClipBoard from './ClipBoard';
import Footer from './Footer';
import Navbar from './Navbar';
import desktopVideo from '/penHome-Large-540p.mp4';
import mobileVideo from '/penHomeMobile-540p.mp4';

const Layout = ({ children }: { children: ReactNode }) => {
	const {
		state: { user },
	} = useAuthContext();
	const { pathname } = useLocation();
	console.log(pathname);

	return (
		<StyledReset>
			<StyledLayout>
				<Banner />
				<Navbar />
				{pathname == '/' && (
					<VideoBg desktopVideo={desktopVideo} mobileVideo={mobileVideo} />
				)}
				<StyledMain>{children}</StyledMain>
			</StyledLayout>
			{user?.preference && <ClipBoard />}
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
