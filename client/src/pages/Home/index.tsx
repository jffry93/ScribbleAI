import React, { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingModal from '../../components/LoadingModal';
import VideoBg from '../../components/VideoBg';
import { useAuthContext } from '../../hooks/useAuthContext';
import Homepage from './Homepage';
import Landing from './Landing';

const Home = () => {
	const {
		state: { user },
	} = useAuthContext();
	const { pathname } = useLocation();

	return (
		<>
			{pathname == '/' && (
				<Suspense fallback={<LoadingModal />}>
					<VideoBg />
				</Suspense>
			)}
			{user ? <Homepage /> : <Landing />}{' '}
		</>
	);
};

export default Home;
