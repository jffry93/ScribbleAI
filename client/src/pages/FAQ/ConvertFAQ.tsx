import React, { useState } from 'react';
import styled from 'styled-components';
import { trpc } from '../../trpc/trpc';
import { StyledContainer, StyledConverter } from '../NSFW/ConvertNsfw';
import { useDebounceCallback } from '../../hooks/useDebounce';
import ErrorMsg from '../../components/ErrorMsg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { JobDescriptionType } from '../../App';

interface FAQRes {
	status: number;
	msg: string;
	data?: string;
}

interface NSFWProps extends JobDescriptionType {
	setIsLoading: (value: boolean) => void;
	setAppropriateMsg: (value: string | undefined) => void;
}

const ConvertFAQ = ({
	setIsLoading,
	setAppropriateMsg,
	jobDescription,
	setJobDescription,
}: NSFWProps) => {
	const {
		state: { user },
	} = useAuthContext();
	const [error, setError] = useState({ value: false, message: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [question, setQuestion] = useState('Why do you want to work here?');
	const [experience, setExperience] = useState(
		user?.preference.experience || ''
	);

	const handleMutate = trpc.jarvis.questionAnswer.useMutation();

	const debouncedSubmit = useDebounceCallback(
		async ({
			question,
			experience,
			jobDescription,
		}: {
			question: string;
			experience: string;
			jobDescription: string;
		}) => {
			try {
				if (isSubmitting) {
					return; // don't make multiple requests
				}
				//disable multiple requests and open loading modal
				setIsSubmitting(true);
				setIsLoading(true);
				//send data to backend and wait for response
				const response: FAQRes = await handleMutate.mutateAsync({
					question,
					experience,
					jobDescription,
				});
				if (response.status < 300) {
					//store data, end loading and remove error message
					setAppropriateMsg(response.data);
					setIsLoading(false);
					setError({ value: false, message: '' });
				} else {
					//end loading and display error message
					setIsLoading(false);
					setError({ value: true, message: response.msg });
				}
				setIsSubmitting(false); // allow for more submissions
			} catch (error) {
				const errorMessage = (error as { message: string }).message;
				setError({ value: true, message: errorMessage });
				setIsLoading(false);
			}
		},
		250
	);

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
				<h1>Frequently Asked Questions</h1>
				<p className='description'>
					Impress with your knowledge! Our tool helps you answer questions with
					accuracy and ease in a snap.
				</p>
				<h3>Instructions:</h3>
				<ul>
					<li>Type a question in the field</li>
					<li>Provide experience</li>
					<li>Provide job posting</li>
					<li>click submit when done</li>
					<li>Copy text generated below</li>
				</ul>
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
