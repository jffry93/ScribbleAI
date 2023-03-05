import React, { useState } from 'react';
import styled from 'styled-components';
import ErrorMsg from '../../components/ErrorMsg';
import TitleDescription from '../../components/TitleDescription';
import { useDebounceCallback } from '../../hooks/useDebounce';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';
import { trpc } from '../../trpc/trpc';

const ConvertGrammar = ({ setAppropriateMsg, setIsLoading }: JarvisProps) => {
	const [uglyText, setUglyText] = useState('');
	const handleJarvis = trpc.jarvis.grammarPolice.useMutation();
	const { debouncedSubmit, error } = useMutateJarvis({
		handleMutate: () => handleJarvis.mutateAsync({ text: uglyText }),
		setIsLoading,
		setAppropriateMsg,
	});

	//must debounce function called inside submit event
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit(uglyText);
	};

	return (
		<StyledContainer>
			<StyledConverter>
				<TitleDescription
					title='Grammar Police 🚔'
					description="Don't sweat the small stuff - we've got you covered when it comes to typos!"
				/>
				<form onSubmit={handleSubmit}>
					{error.value && <ErrorMsg msg={error.message} />}
					<label>Original text:</label>
					<StyledTextarea
						name='convertNsfw'
						placeholder='Please enter the text you want reviewed! Ex."Your the best person i have ever met"'
						onChange={(e) => {
							setUglyText(e.target.value);
						}}
					/>
					<button type='submit'>Refine Text</button>
				</form>
			</StyledConverter>
		</StyledContainer>
	);
};

export default ConvertGrammar;
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
