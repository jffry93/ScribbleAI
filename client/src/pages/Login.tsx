import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, isLoading, error, errorMsg } = useLogin();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Log in</h1>
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
				Log in
			</button>
			{error && <div className='error'>{error}</div>}
		</form>
	);
};

export default Login;
