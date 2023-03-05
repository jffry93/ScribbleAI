import React, { useState } from 'react';
import { trpc } from '../../trpc/trpc';
import helperData from '../../data/helperContent.json';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';
import Form from '../../components/Form';
import { StyledJarvisForm } from '../../GlobalStyles';
const { nsfw: nsfwData } = helperData;

const ConvertNsfw = ({ setAppropriateMsg }: JarvisProps) => {
	const [nsfw, setNsfw] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleJarvis = trpc.jarvis.makeFancy.useMutation();
	const { debouncedSubmit, error } = useMutateJarvis({
		handleMutate: () => handleJarvis.mutateAsync({ text: nsfw }),
		setIsLoading,
		setAppropriateMsg,
	});
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit({ text: nsfw });
	};

	return (
		<StyledJarvisForm>
			<Form
				data={{
					handleSubmit,
					isLoading,
					errorData: { msg: error.message, status: error.value },
					content: nsfwData,
				}}
			>
				<label>Original text:</label>
				<textarea
					name='convertNsfw'
					placeholder='Please enter the text you want converted'
					onChange={(e) => {
						setNsfw(e.target.value);
					}}
				/>
				<button type='submit'>Refine Text</button>
			</Form>
		</StyledJarvisForm>
	);
};

export default ConvertNsfw;
