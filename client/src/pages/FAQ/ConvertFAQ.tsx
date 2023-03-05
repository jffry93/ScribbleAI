import React, { useState } from 'react';
import { trpc } from '../../trpc/trpc';
import { useAuthContext } from '../../hooks/useAuthContext';
import { JobDescriptionType } from '../../App';
import helperData from '../../data/helperContent.json';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';
import Form from '../../components/Form';
import { StyledJarvisForm } from '../../GlobalStyles';

const ConvertFAQ = ({
	setAppropriateMsg,
	jobDescription,
	setJobDescription,
}: JarvisProps & JobDescriptionType) => {
	const {
		state: { user },
	} = useAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
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
		<StyledJarvisForm>
			<Form
				data={{
					handleSubmit,
					isLoading,
					errorData: { msg: error.message, status: error.value },
					content: faq,
				}}
			>
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
			</Form>
		</StyledJarvisForm>
	);
};

export default ConvertFAQ;
