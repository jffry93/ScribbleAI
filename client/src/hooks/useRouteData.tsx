import { useState } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

export const useRouteData = () => {
	const [email, setEmail] = useState('');

	const routeData = [
		{
			path: '/',
			element: () => <Home />,
		},
		{
			path: '/login',
			element: () => <Login email={email} setEmail={setEmail} />,
		},
		{
			path: '/signup',
			element: () => <SignUp email={email} setEmail={setEmail} />,
		},
		{
			path: '*',
			element: () => <p>404 error</p>,
		},
	];

	return routeData;
};
