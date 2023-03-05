import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { EmailType } from '../App';
import Form from '../components/Form';
import { useDebounceCallback } from '../hooks/useDebounce';
import { useLogin } from '../hooks/useLogin';

const Login = ({ email, setEmail }: EmailType) => {
	const [password, setPassword] = useState('');
	const { login, isLoading, error, errorMsg } = useLogin();

	const debouncedSubmit = useDebounceCallback(async (email, password) => {
		await login(email, password);
	}, 250);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit(email, password);
	};
	const formContent = {
		title: 'Login',
		description:
			"Let's pick up where we left off. Log in and let's make some magic.",
	};
	return (
		<StyledContent>
			<Form
				data={{
					handleSubmit,
					isLoading,
					errorData: { msg: errorMsg, status: error },
					content: formContent,
				}}
			>
				<label>Email:</label>
				<input
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
					LOG IN
				</button>
				<p className='footer'>
					Unlock your access.
					<Link to={'/signup'}> Click here to sign up</Link>
				</p>
			</Form>
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
	a:active {
		color: var(--secondary);
	}
	.footer {
		text-align: center;
	}
`;
