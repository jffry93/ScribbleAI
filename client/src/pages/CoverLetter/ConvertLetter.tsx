import React, { useState } from 'react';
import styled from 'styled-components';
import { trpc } from '../../trpc/trpc';
import { StyledContainer, StyledConverter } from '../NSFW/ConvertNsfw';
import ErrorMsg from '../../components/ErrorMsg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { JobDescriptionType } from '../../App';
import TitleDescription from '../../components/TitleDescription';
import helperData from '../../data/helperContent.json';
import { useMutateJarvis, JarvisProps } from '../../hooks/useMutateJarvis';

const { coverLetter } = helperData;
const ConvertCoverLetter = ({
	setIsLoading,
	setAppropriateMsg,
	jobDescription,
	setJobDescription,
}: JarvisProps & JobDescriptionType) => {
	const {
		state: { user },
	} = useAuthContext();
	const [experience, setExperience] = useState(
		user?.preference.experience || ''
	);

	const handleJarvis = trpc.jarvis.coverLetter.useMutation();
	const { debouncedSubmit, error } = useMutateJarvis({
		handleMutate: () =>
			handleJarvis.mutateAsync({
				experience,
				jobDescription,
			}),
		setIsLoading,
		setAppropriateMsg,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit({
			experience,
			jobDescription,
		});
	};

	return (
		<StyledContainer>
			<StyledConverter>
				<TitleDescription
					title={coverLetter.title}
					description={coverLetter.description}
				/>
				<StyledForm onSubmit={handleSubmit}>
					{error.value && <ErrorMsg msg={error.message} />}
					<label>Past Experience:</label>
					<input
						name='Experience'
						value={experience}
						placeholder='Example... I taught a full stack web development course for Concordia University which taught React Express Node and MongoDb. '
						onChange={(e) => {
							setExperience(e.target.value);
						}}
					/>
					<label>Job Posting:</label>
					<textarea
						name='Job'
						value={jobDescription}
						placeholder='Enter job posting'
						onChange={(e) => {
							setJobDescription(e.target.value);
						}}
					/>
					<button type='submit'>Generate Letter</button>
				</StyledForm>
			</StyledConverter>
		</StyledContainer>
	);
};

export default ConvertCoverLetter;

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
