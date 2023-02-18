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
				<p>
					Let's pick up where we left off. Log in and let's make some magic.
				</p>
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
						LOG IN
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
	width: 100%;
	max-width: 420px;
	gap: var(--sm-padding);
	padding-bottom: var(--shift-padding);
	p {
		color: var(--secondary-text-color);
	}
`;

export const StyledContent = styled.div`
	padding: var(--layout-padding);
	display: flex;
	min-height: var(--container-height);
	align-items: center;
	justify-content: center;
`;
