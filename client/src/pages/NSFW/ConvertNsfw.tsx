import React, { useState } from 'react';
import styled from 'styled-components';
import { trpc } from '../../trpc/trpc';

interface NSFWResType {
	status: number;
	msg: string;
	data?: string;
}
interface NSFWProps {
	appropriateMsg: string | undefined;
	setAppropriateMsg: (value: string | undefined) => void;
}
const ConvertNsfw = ({ appropriateMsg, setAppropriateMsg }: NSFWProps) => {
	const [nsfw, setNsfw] = useState('');
	const handleMutate = trpc.jarvis.makeFancy.useMutation();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response: NSFWResType = await handleMutate.mutateAsync({
			text: nsfw,
		});
		if (response.status < 300) {
			setAppropriateMsg(response.data);
			console.log(response.data);
		}
	};

	return (
		<StyledContainer>
			<StyledConverter>
				<h2>Sophisticated Generator</h2>
				<p>
					Elevate your writing to a confident and professional level with our
					innovative tool.
				</p>
				<h3>Instructions:</h3>
				<ul>
					<li>Type anything in the field below</li>
					<li>Click submit when done</li>
					<li>Copy professional text generated</li>
				</ul>
				<form onSubmit={handleSubmit}>
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
	h3,
	ul {
		display: none;
	}
	p,
	li {
		/* padding-left: var(--sm-padding); */
		color: var(--secondary-text-color);
	}
	h3 {
		margin-top: 24px;
	}
	ul {
		padding-left: var(--md-padding);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 12px 0;
	}
	button {
	}
`;

const StyledTextarea = styled.textarea`
	width: 100%;
	min-height: 100px;
	padding: 12px;
`;
