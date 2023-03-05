import React, { useState } from 'react';
import styled from 'styled-components';
import ErrorMsg from '../../components/ErrorMsg';
import TitleDescription from '../../components/TitleDescription';
import { trpc } from '../../trpc/trpc';
import helperData from '../../data/helperContent.json';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';
const { nsfw: nsfwData } = helperData;

const ConvertNsfw = ({ setAppropriateMsg, setIsLoading }: JarvisProps) => {
	const [nsfw, setNsfw] = useState('');
	const handleJarvis = trpc.jarvis.makeFancy.useMutation();
	const { debouncedSubmit, error } = useMutateJarvis({
		handleMutate: () => handleJarvis.mutateAsync({ text: nsfw }),
		setIsLoading,
		setAppropriateMsg,
	});
	//must debounce function called inside submit event
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit({ text: nsfw });
	};

	return (
		<StyledContainer>
			<StyledConverter>
				<TitleDescription
					title={nsfwData.title}
					description={nsfwData.description}
				/>
				<form onSubmit={handleSubmit}>
					{error.value && <ErrorMsg msg={error.message} />}
					<label>Original text:</label>
					<StyledTextarea
						name='convertNsfw'
						placeholder='Please enter the text you want converted'
						onChange={(e) => {
							setNsfw(e.target.value);
						}}
					/>
					<button type='submit'>Refine Text</button>
				</form>
			</StyledConverter>
		</StyledContainer>
	);
};

export default ConvertNsfw;
export const StyledContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 500px;
	margin: auto;
`;
export const StyledConverter = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding-bottom: var(--shift-padding);

	.description {
		color: var(--secondary-text-color);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 12px 0;
	}
`;

const StyledTextarea = styled.textarea`
	width: 100%;
	min-height: 100px;
	padding: 12px;
`;
