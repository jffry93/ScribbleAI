import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoBg from '../../components/VideoBg';
import { useAuthContext } from '../../hooks/useAuthContext';
import Homepage from './Homepage';
import Landing from './Landing';
import desktopVideo from '/penHome-Large-540p.mp4';
import mobileVideo from '/penHomeMobile-540p.mp4';

const Home = () => {
	const {
		state: { user },
	} = useAuthContext();
	const { pathname } = useLocation();

	return (
		<>
			{pathname == '/' && (
				<VideoBg desktopVideo={desktopVideo} mobileVideo={mobileVideo} />
			)}
			{user ? <Homepage /> : <Landing />}{' '}
		</>
	);
};

export default Home;
