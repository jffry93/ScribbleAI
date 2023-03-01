import React, { useState } from 'react';
import styled from 'styled-components';
import ErrorMsg from '../../components/ErrorMsg';
import TitleDescription from '../../components/TitleDescription';
import { useDebounceCallback } from '../../hooks/useDebounce';
import { trpc } from '../../trpc/trpc';

interface NSFWResType {
	status: number;
	msg: string;
	data?: string;
}
interface NSFWProps {
	setIsLoading: (value: boolean) => void;
	setAppropriateMsg: (value: string | undefined) => void;
}
const ConvertNsfw = ({ setAppropriateMsg, setIsLoading }: NSFWProps) => {
	const [nsfw, setNsfw] = useState('');
	const [error, setError] = useState({ value: false, message: '' });
	const handleMutate = trpc.jarvis.makeFancy.useMutation();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const debouncedSubmit = useDebounceCallback(async (text: string) => {
		try {
			if (isSubmitting) {
				return; // don't make multiple requests
			}
			//disable multiple requests and open loading modal
			setIsSubmitting(true);
			setIsLoading(true);
			//send data to backend and wait for response
			const response: NSFWResType = await handleMutate.mutateAsync({ text });
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
	}, 250);

	//must debounce function called inside submit event
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		debouncedSubmit(nsfw);
	};

	return (
		<StyledContainer>
			<StyledConverter>
				<TitleDescription
					title='Sophisticated Generator'
					description='Elevate your writing to a confident and professional level with our
					innovative tool.'
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
