import React, { Component } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import LoadingModal from './LoadingModal';

const LoadPage = ({
	Component,
	props,
}: {
	Component: React.FC<any>;
	props?: any;
}) => {
	const {
		state: { user },
	} = useAuthContext();
	console.log(user?.preference);

	return <>{user?.preference ? <Component {...props} /> : <LoadingModal />}</>;
};

export default LoadPage;
