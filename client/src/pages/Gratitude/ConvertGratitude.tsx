import React, { useState } from 'react';
import styled from 'styled-components';
import { trpc } from '../../trpc/trpc';
import { StyledContainer, StyledConverter } from '../NSFW/ConvertNsfw';
import ErrorMsg from '../../components/ErrorMsg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { JobDescriptionType } from '../../App';
import TitleDescription from '../../components/TitleDescription';
import helperData from '../../data/helperContent.json';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';

const ConvertGratitude = ({
	setIsLoading,
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
	const { gratitude } = helperData;

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
		<StyledContainer>
			<StyledConverter>
				<TitleDescription
					title={gratitude.title}
					description={gratitude.description}
				/>
				<StyledForm onSubmit={handleSubmit}>
					{error.value && <ErrorMsg msg={error.message} />}
					<StyledNameContainer>
						<div>
							<label>Name:</label>
							<input
								name='Name'
								value={formData.name}
								placeholder={'Example... Why do you want to work here? '}
								onChange={(e) => {
									setFormData({ ...formData, name: e.target.value });
								}}
							/>
						</div>
						<div>
							<label>Interviewer:</label>
							<input
								name='Interviewer'
								value={formData.interviewer}
								placeholder={'Hiring managers name'}
								onChange={(e) => {
									setFormData({ ...formData, interviewer: e.target.value });
								}}
							/>
						</div>
					</StyledNameContainer>
					<label>Your Perspective:</label>
					<input
						name='Experience'
						value={formData.perspective}
						placeholder='I had a great time learning about How the ceo swam with sharks to support a charity at the last company event. Sounds like an exciting place to work.'
						onChange={(e) => {
							setFormData({ ...formData, perspective: e.target.value });
						}}
					/>
					<label>Company & Role:</label>
					<textarea
						name='Job'
						value={jobDescription}
						placeholder='Enter job posting'
						onChange={(e) => {
							setJobDescription(e.target.value);
						}}
					/>
					<button type='submit'>Spread Love</button>
				</StyledForm>
			</StyledConverter>
		</StyledContainer>
	);
};

export default ConvertGratitude;

const StyledNameContainer = styled.div`
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	input {
		width: 100%;
		margin-top: 8px;
	}
	div {
		flex: 1;
		/* min-width: 250px; */
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 8px;
	input,
	textarea {
		padding: 12px;
	}
	textarea {
		min-height: 100px;
	}
`;
