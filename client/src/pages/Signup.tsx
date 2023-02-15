import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signup, isLoading, error, errorMsg } = useSignup();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signup(email, password);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Sign up</h1>
			{error && <p>{errorMsg}</p>}
			<label>Email:</label>
			<input
				type='email'
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			<label>Password:</label>
			<input
				type='password'
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<button type='submit' disabled={isLoading === null ? false : isLoading}>
				Sign up
			</button>
			{error && <div className='error'>{error}</div>}
		</form>
	);
};

export default Signup;
