import React, { useState } from 'react';
import styled from 'styled-components';
import { trpc } from '../../trpc/trpc';
import { StyledContainer, StyledConverter } from '../NSFW/ConvertNsfw';
import { useDebounceCallback } from '../../hooks/useDebounce';
import ErrorMsg from '../../components/ErrorMsg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { JobDescriptionType } from '../../App';
import TitleDescription from '../../components/TitleDescription';
import helperData from '../../data/helperContent.json';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';

const ConvertFAQ = ({
	setIsLoading,
	setAppropriateMsg,
	jobDescription,
	setJobDescription,
}: JarvisProps & JobDescriptionType) => {
	const {
		state: { user },
	} = useAuthContext();
	const [question, setQuestion] = useState('Why do you want to work here?');
	const [experience, setExperience] = useState(
		user?.preference.experience || ''
	);
	const { faq } = helperData;

	const handleJarvis = trpc.jarvis.questionAnswer.useMutation();
	const { debouncedSubmit, error } = useMutateJarvis({
		handleMutate: () =>
			handleJarvis.mutateAsync({
				question,
				experience,
				jobDescription,
			}),
		setIsLoading,
		setAppropriateMsg,
	});

	//must debounce function called inside submit event
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit({
			question,
			experience,
			jobDescription,
		});
	};
	return (
		<StyledContainer>
			<StyledConverter>
				<TitleDescription title={faq.title} description={faq.description} />
				<StyledForm onSubmit={handleSubmit}>
					{error.value && <ErrorMsg msg={error.message} />}
					<label>Question:</label>
					<input
						name='Question'
						value={question}
						placeholder={'Example... Why do you want to work here? '}
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
					/>
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
					<button type='submit'>Answer Question</button>
				</StyledForm>
			</StyledConverter>
		</StyledContainer>
	);
};

export default ConvertFAQ;

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
