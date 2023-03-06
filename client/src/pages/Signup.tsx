import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailType } from '../App';
import Form, { LabelProps } from '../components/Form';
import { useDebounceCallback } from '../hooks/useDebounce';
import { useSignup } from '../hooks/useSignup';
import { StyledContent } from './Login';

const formContent = {
	title: 'Sign Up',
	description:
		'Find your dream job faster, sign up and become part of our awesome community.',
};

const SignUp = ({ email, setEmail }: EmailType) => {
	const [password, setPassword] = useState('');
	const { signup, isLoading, error, errorMsg } = useSignup();

	const debouncedSubmit = useDebounceCallback(async (email, password) => {
		await signup(email, password);
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
						placeholder='Create password'
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
						SIGN UP
					</Button>
					<Typography className='footer'>
						Unlock your access.
						<Link to={'/login'}> Click here to login</Link>
					</Typography>
				</Form>
			</Box>
		</StyledContent>
	);
};

export default SignUp;
