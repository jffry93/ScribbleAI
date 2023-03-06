import React, { useState } from 'react';
import helperData from '../../data/helperContent.json';
import { JarvisProps, useMutateJarvis } from '../../hooks/useMutateJarvis';
import { trpc } from '../../trpc/trpc';
import Form, { LabelProps } from '../../components/Form';
import { StyledJarvisForm } from '../../GlobalStyles';
import { Button, TextField, Typography } from '@mui/material';
const { grammar } = helperData;
const ConvertGrammar = ({ setAppropriateMsg }: JarvisProps) => {
	const [uglyText, setUglyText] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
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
		<StyledJarvisForm>
			<Form
				data={{
					handleSubmit,
					isLoading,
					errorData: { msg: error.message, status: error.value },
					content: grammar,
				}}
			>
				<Typography {...LabelProps}>Original text:</Typography>
				<TextField
					multiline
					placeholder='Please enter the text you want reviewed! Ex."Your the best person i have ever met"'
					onChange={(e) => {
						setUglyText(e.target.value);
					}}
				/>
				<Button type='submit'>Refine Text</Button>
			</Form>
		</StyledJarvisForm>
	);
};

export default ConvertGrammar;
