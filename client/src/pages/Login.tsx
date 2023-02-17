import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledForm, StyledPage } from '../GlobalStyles';
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
		<StyledContent>
			<StyledMain>
				<h1>Login</h1>
				<h2>Sign in and stay connected to all your account information</h2>
				<StyledForm onSubmit={handleSubmit}>
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
					<button
						type='submit'
						disabled={isLoading === null ? false : isLoading}
					>
						Log in
					</button>
					<p>
						Unlock your access. Click here to{' '}
						<Link to={'/signup'}>sign up</Link>
					</p>
				</StyledForm>
			</StyledMain>
		</StyledContent>
	);
};

export default Login;
export const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	max-width: var(--container-width-limit);
	gap: var(--sm-padding);
`;

export const StyledContent = styled(StyledPage)`
	align-items: center;
	justify-content: center;
`;
