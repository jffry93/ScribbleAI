import { Box, Button, Input, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { EmailType } from '../App';
import Form, { LabelProps } from '../components/Form';
import { useDebounceCallback } from '../hooks/useDebounce';
import { useLogin } from '../hooks/useLogin';
const formContent = {
	title: 'Login',
	description:
		"Let's pick up where we left off. Log in and let's make some magic.",
};
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

	return (
		<StyledContent>
			<Box className='container'>
				<Form
					data={{
						handleSubmit,
						isLoading,
						errorData: { msg: errorMsg, status: error },
						content: formContent,
					}}
				>
					<Typography {...LabelProps}>Required*</Typography>
					<TextField
						placeholder='Enter your email'
						variant='filled'
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<Typography {...LabelProps}>Required*</Typography>
					<TextField
						placeholder='Enter your password'
						variant='filled'
						type='password'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>

					<Button
						type='submit'
						disabled={isLoading === null ? false : isLoading}
					>
						LOG IN
					</Button>
					<Typography className='footer'>
						Unlock your access.
						<Link to={'/signup'}> Click here to sign up</Link>
					</Typography>
				</Form>
			</Box>
		</StyledContent>
	);
};

export default Login;

export const StyledContent = styled.div`
	height: 100%;
	/* background-color: var(--bg-color); */
	min-height: var(--container-height);

	display: flex;
	align-items: center;
	justify-content: center;
	.container {
		padding: var(--layout-padding);
		max-width: 420px;
		margin: auto;
	}

	.footer {
		text-align: center;
	}
`;
