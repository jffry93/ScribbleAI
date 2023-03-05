import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from '../../components/Dropdown';
import ErrorMsg from '../../components/ErrorMsg';
import TitleDescription from '../../components/TitleDescription';
import { trpc } from '../../trpc/trpc';
import helperData from '../../data/helperContent.json';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';
import {
	dropDownOptions,
	useCategoryDropdown,
} from './hook/useCategoryDropdown';
const { thesaurus } = helperData;
const ReviewPhrase = ({ setAppropriateMsg, setIsLoading }: JarvisProps) => {
	const [nsfw, setNsfw] = useState('');
	const handleJarvis = trpc.jarvis.thesaurusRex.useMutation();
	const { selectedOption, setSelectedOption } = useCategoryDropdown();
	const { debouncedSubmit, error } = useMutateJarvis({
		handleMutate: () =>
			handleJarvis.mutateAsync({ text: nsfw, category: selectedOption.value }),
		setIsLoading,
		setAppropriateMsg,
	});
	//must debounce function called inside submit event
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit(nsfw);
	};

	return (
		<StyledContainer>
			<StyledConverter>
				<TitleDescription
					title={thesaurus.title}
					description={thesaurus.description}
				/>
				<form onSubmit={handleSubmit}>
					{error.value && <ErrorMsg msg={error.message} />}
					<label>Phrase or word:</label>
					<Dropdown
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
						options={dropDownOptions}
					/>
					<label>Phrase or word:</label>
					<StyledTextarea
						name='ReviewPhrase'
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

export default ReviewPhrase;
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
