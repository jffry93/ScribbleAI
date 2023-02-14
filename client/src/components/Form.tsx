import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/TestContext';
import FormInput from './FormInput';
interface User {
	name?: string;
	email?: string;
	[key: string]: any;
}
const Form = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const { formData, setFormData } = useContext(ThemeContext) || {
		formData: null,
		setFormData: () => {},
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data: User = { name, email };
		Object.keys(data).map((item: string) => {
			if (data[item] === '') {
				delete data[item];
			}
		});
		setFormData(data);
	};
	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledCurrentValues>
				<h2>Current Values</h2>
				<p>
					email:<strong>{formData?.email}</strong>
				</p>
				<p>
					name:<strong>{formData?.name}</strong>
				</p>
			</StyledCurrentValues>
			<FormInput state={email} setState={setEmail} placeholder={'email'} />
			<FormInput state={name} setState={setName} placeholder={'name'} />
			<button type='submit'>Submit</button>
		</StyledForm>
	);
};

export default Form;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: var(--width-limit);
	margin: auto;
	input {
		flex: 1;
	}
`;
const StyledCurrentValues = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	h2 {
		width: 100%;
		text-align: center;
	}
	h2,
	p {
		margin: 8px 0;
	}
	strong {
		border-bottom: 1px solid #888;
	}
	padding: 32px 0;
`;
