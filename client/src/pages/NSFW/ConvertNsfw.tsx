import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCopy } from 'react-icons/fa';
import FormInput from '../../components/FormInput';
import { trpc } from '../../trpc/trpc';
import { StyledFlexCenter, StyledIconContainer } from '../../GlobalStyles';
import { copyClipboard } from '../../util/copyClipboard';

interface NSFWResType {
	status: number;
	msg: string;
	data?: string;
}
const ConvertNsfw = () => {
	const [nsfw, setNsfw] = useState('');
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
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

	// const clipboardHandler = (
	// 	element: React.MouseEvent<HTMLDivElement>,
	// 	text: string
	// ) => {
	// 	console.log('testing handler');
	// 	let clipboard = element.currentTarget.children[0];
	// 	console.log(clipboard);
	// 	// clipboard.children[0].style.display = ' block';
	// 	navigator.clipboard.writeText(text);
	// 	setTimeout(() => {
	// 		console.log('clg in timeout');
	// 		// clipboard.children[0].style.display = ' none';
	// 	}, 2000);
	// };

	return (
		<div>
			<h1>Convert to Formal</h1>
			<h3>
				Whatever you type will return a response you can send in the workplace.
			</h3>
			<p>Instructions:</p>
			<ul>
				<li>Type whatever you want in the field below</li>
				<li>click submit when done</li>
				<li>Copy text generated below</li>
			</ul>
			<form onSubmit={handleSubmit}>
				<StyledTextarea
					name='convertNsfw'
					placeholder='Type whatever you want'
					onChange={(e) => {
						setNsfw(e.target.value);
					}}
				/>
				<button type='submit'>Submit</button>
			</form>
			{appropriateMsg && (
				<StyledCopy
					onClick={() => {
						if (appropriateMsg) {
							copyClipboard(appropriateMsg);
						} else {
							console.log('nothing to copy');
						}
					}}
				>
					<StyledCopyButton>
						<FaCopy />
					</StyledCopyButton>
					<h4>{appropriateMsg}</h4>
				</StyledCopy>
			)}
		</div>
	);
};

export default ConvertNsfw;
const StyledCopy = styled.div`
	padding: var(--lg-padding);
	border: 1px solid green;
	position: relative;
	h4 {
		border: 1px solid yellow;
		margin-right: 28px;
	}
`;

const StyledTextarea = styled.textarea`
	width: 100%;
	min-height: 60px;
`;

const StyledCopyButton = styled(StyledIconContainer)`
	position: absolute;
	top: var(--sm-padding);
	right: var(--sm-padding);
`;
