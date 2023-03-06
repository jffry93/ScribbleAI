import React, { useState } from 'react';
import Dropdown from '../../components/Dropdown';
import { trpc } from '../../trpc/trpc';
import helperData from '../../data/helperContent.json';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';
import {
	dropDownOptions,
	useCategoryDropdown,
} from './hook/useCategoryDropdown';
import Form, { LabelProps } from '../../components/Form';
import { StyledJarvisForm } from '../../GlobalStyles';
import { Button, TextField, Typography } from '@mui/material';
const { thesaurus } = helperData;
const ReviewPhrase = ({ setAppropriateMsg }: JarvisProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [nsfw, setNsfw] = useState('');
	const handleJarvis = trpc.jarvis.thesaurusRex.useMutation();
	const { selectedOption, setSelectedOption } = useCategoryDropdown();
	const { debouncedSubmit, error } = useMutateJarvis({
		handleMutate: () =>
			handleJarvis.mutateAsync({ text: nsfw, category: selectedOption }),
		setIsLoading,
		setAppropriateMsg,
	});
	//must debounce function called inside submit event
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit(nsfw);
	};

	return (
		<StyledJarvisForm>
			<Form
				data={{
					handleSubmit,
					isLoading,
					errorData: { msg: error.message, status: error.value },
					content: thesaurus,
				}}
			>
				<Typography {...LabelProps}>Genre:</Typography>
				<Dropdown
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
					options={dropDownOptions}
				/>
				<Typography {...LabelProps}>Phrase or word:</Typography>
				<TextField
					multiline
					placeholder='Please enter the text you want converted'
					onChange={(e) => {
						setNsfw(e.target.value);
					}}
				/>
				<Button type='submit'>Refine Text</Button>
			</Form>
		</StyledJarvisForm>
	);
};

export default ReviewPhrase;
