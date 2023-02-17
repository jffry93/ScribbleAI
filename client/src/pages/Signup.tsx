import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledForm } from '../GlobalStyles';
import { useSignup } from '../hooks/useSignup';
import { StyledContent, StyledMain } from './Login';

const Signup = () => {
	const [email, setEmail] = useState('');
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
