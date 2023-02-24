import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailType } from '../App';
import ErrorMsg from '../components/ErrorMsg';
import { StyledForm } from '../GlobalStyles';
import { useSignup } from '../hooks/useSignup';
import { StyledContent, StyledMain } from './Login';

const Signup = ({ email, setEmail }: EmailType) => {
	const [password, setPassword] = useState('');
	const { signup, isLoading, error, errorMsg } = useSignup();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signup(email, password);
	};

	return (
		<StyledContent>
			<StyledMain>
				<h1>Sign Up</h1>
				<p>
					Find your dream job faster, sign up and become part of our awesome
					community.
				</p>
				<StyledForm onSubmit={handleSubmit}>
					{error && <ErrorMsg msg={errorMsg} />}
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
						SIGN UP
					</button>
					<p>
						Already have an account? Click here to{' '}
						<Link to={'/login'}>login</Link>
					</p>
				</StyledForm>
			</StyledMain>
		</StyledContent>
	);
};

export default Signup;
