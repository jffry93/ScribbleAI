import { useTheme } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import ErrorMsg, { ErrorProps } from './ErrorMsg';
import LoadingModal from './LoadingModal';
import TitleDescription, { TitleDescProps } from './TitleDescription';

interface FormData {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	isLoading: boolean | null;
	errorData: ErrorProps;
	content: TitleDescProps;
}

interface FormProps {
	children: React.ReactNode;
	data: FormData;
}

const Form = ({ children, data }: FormProps) => {
	const { handleSubmit, isLoading, errorData, content } = data;
	const { msg, status } = errorData;
	const { title, description } = content;
	const theme = useTheme();
	return (
		<StyledMain>
			<TitleDescription title={title} description={description} />
			<StyledForm onSubmit={handleSubmit}>
				{isLoading && <LoadingModal />}
				<ErrorMsg data={{ msg, status }} />
				{children}
			</StyledForm>
		</StyledMain>
	);
};

export default Form;

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	/* max-width: 420px; */
	gap: var(--sm-padding);
	padding-bottom: var(--shift-padding);
	p {
		color: var(--secondary-text-color);
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 8px;

	label {
		margin: 0 8px;
	}

	input,
	textarea,
	select {
		padding: 4px 0px 2px;
		width: 100%;
	}

	input {
		border-radius: 4px;

		/* font-size: 20px; */
	}

	textarea {
		width: 100%;
		min-height: 100px;
	}
	button {
		margin: 4px 0 12px;
		padding: var(--sm-padding);
	}
`;

export const LabelProps = {
	sx: {
		pl: 0.5,
	},
};
