import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailType } from '../App';
import Form from '../components/Form';
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
					SIGN UP
				</button>
				<p className='footer'>
					Already have an account?
					<Link to={'/login'}> Click here to login</Link>
				</p>
			</Form>
		</StyledContent>
	);
};

export default SignUp;
