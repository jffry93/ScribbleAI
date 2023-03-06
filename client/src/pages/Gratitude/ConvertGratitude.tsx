import React, { useState } from 'react';
import styled from 'styled-components';
import { trpc } from '../../trpc/trpc';
import { useAuthContext } from '../../hooks/useAuthContext';
import { JobDescriptionType } from '../../App';
import helperData from '../../data/helperContent.json';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';
import Form, { LabelProps } from '../../components/Form';
import { StyledJarvisForm } from '../../GlobalStyles';
import { Box, Button, TextField, Typography } from '@mui/material';
const { gratitude } = helperData;
const ConvertGratitude = ({
	setAppropriateMsg,
	jobDescription,
	setJobDescription,
}: JarvisProps & JobDescriptionType) => {
	const {
		state: { user },
	} = useAuthContext();
	const [formData, setFormData] = useState({
		name: user?.preference.name || '',
		interviewer: '',
		perspective: '',
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleJarvis = trpc.jarvis.showAppreciation.useMutation();
	const { debouncedSubmit, error } = useMutateJarvis({
		handleMutate: () =>
			handleJarvis.mutateAsync({ ...formData, jobDescription }),
		setIsLoading,
		setAppropriateMsg,
	});

	//must debounce function called inside submit event
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit({ ...formData, jobDescription });
	};
	return (
		<StyledJarvisForm>
			<Form
				data={{
					handleSubmit,
					isLoading,
					errorData: { msg: error.message, status: error.value },
					content: gratitude,
				}}
			>
				<StyledNameContainer>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Typography {...LabelProps}>Name:</Typography>
						<TextField
							fullWidth
							value={formData.name}
							placeholder={'Example... Why do you want to work here? '}
							onChange={(e) => {
								setFormData({ ...formData, name: e.target.value });
							}}
						/>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Typography {...LabelProps}>Interviewer:</Typography>
						<TextField
							fullWidth
							value={formData.interviewer}
							placeholder={'Hiring managers name'}
							onChange={(e) => {
								setFormData({ ...formData, interviewer: e.target.value });
							}}
						/>
					</Box>
				</StyledNameContainer>
				<Typography {...LabelProps}>Your Perspective:</Typography>
				<TextField
					fullWidth
					value={formData.perspective}
					placeholder='I had a great time learning about How the ceo swam with sharks to support a charity at the last company event. Sounds like an exciting place to work.'
					onChange={(e) => {
						setFormData({ ...formData, perspective: e.target.value });
					}}
				/>
				<Typography {...LabelProps}>Company & Role:</Typography>
				<TextField
					multiline
					value={jobDescription}
					placeholder='Enter job posting'
					onChange={(e) => {
						setJobDescription(e.target.value);
					}}
				/>
				<Button type='submit'>Spread Love</Button>
			</Form>
		</StyledJarvisForm>
	);
};

export default ConvertGratitude;

const StyledNameContainer = styled.div`
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	input {
		width: 100%;
	}
	div {
		flex: 1;
	}
`;
