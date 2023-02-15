import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Landing = () => {
	const {
		state: { user },
	} = useAuthContext();
	return (
		<div>
			<h2>Landing</h2>
			{!user && (
				<>
					<Link to='/signup'>Signup</Link>
					<Link to='/login'>Login</Link>
				</>
			)}
		</div>
	);
};

export default Landing;
