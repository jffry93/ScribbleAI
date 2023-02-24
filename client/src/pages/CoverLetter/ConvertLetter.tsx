import React, { useState } from 'react';
import styled from 'styled-components';
import { trpc } from '../../trpc/trpc';
import { StyledContainer, StyledConverter } from '../NSFW/ConvertNsfw';
import { useDebounceCallback } from '../../hooks/useDebounce';
import ErrorMsg from '../../components/ErrorMsg';
import { useAuthContext } from '../../hooks/useAuthContext';

interface NSFWResType {
	status: number;
	msg: string;
	data?: string;
}
interface JobDescriptionType {
	jobDescription: string;
	setJobDescription: (value: string) => void;
}
interface NSFWProps extends JobDescriptionType {
	setIsLoading: (value: boolean) => void;
	setAppropriateMsg: (value: string | undefined) => void;
}

const ConvertCoverLetter = ({
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
	const [experience, setExperience] = useState(
		user?.preference.experience || ''
	);

	const handleMutate = trpc.jarvis.coverLetter.useMutation();
	const debouncedSubmit = useDebounceCallback(
		async ({
			experience,
			jobDescription,
		}: {
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
				const response: NSFWResType = await handleMutate.mutateAsync({
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
				<h1>Cover Letter</h1>
				<p className='description'>
					Create customized cover letters in seconds with our powerful letter
					generator.
				</p>
				<h3>Instructions:</h3>
				<ul>
					<li>Provide experience</li>
					<li>Provide job posting</li>
					<li>click submit when done</li>
					<li>Copy text generated below</li>
				</ul>
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
