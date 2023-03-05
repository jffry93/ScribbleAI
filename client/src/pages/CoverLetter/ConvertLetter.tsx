import React, { useState } from 'react';
import { trpc } from '../../trpc/trpc';
import { useAuthContext } from '../../hooks/useAuthContext';
import { JobDescriptionType } from '../../App';
import helperData from '../../data/helperContent.json';
import { useMutateJarvis, JarvisProps } from '../../hooks/useMutateJarvis';
import Form from '../../components/Form';
import { StyledJarvisForm } from '../../GlobalStyles';

const { coverLetter } = helperData;
const ConvertCoverLetter = ({
	setAppropriateMsg,
	jobDescription,
	setJobDescription,
}: JarvisProps & JobDescriptionType) => {
	const {
		state: { user },
	} = useAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
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
		<StyledJarvisForm>
			<Form
				data={{
					handleSubmit,
					isLoading,
					errorData: { msg: error.message, status: error.value },
					content: coverLetter,
				}}
			>
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
			</Form>
		</StyledJarvisForm>
	);
};

export default ConvertCoverLetter;
