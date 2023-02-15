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
const FAQ = () => {
	const [question, setQuestion] = useState('Why do you want to work here?');
	const [experience, setExperience] = useState(
		'I taught a full stack web development course for Concordia University which taught React Express Node and MongoDb'
	);
	const [jobDescription, setJobDescription] = useState(`The Team: 
  We design, develop, and host data rich, full featured, high traffic web and mobile applications for financial institutions, brokerages, and media clients around the world. We use modern API-driven client-side rendered frameworks and .NET server-side rendered applications to deliver custom user interfaces that complement our clients' existing brand. With access to thousands of in-house data feeds, we utilize highly leveraged service tier applications to create solutions that delight our customers. Working in an agile and highly collaborative environment, our teams join together as one to deliver world class products. 
  https://www.builtincolorado.com/company/ihs-markit-digital 
  
  The Impact: 
  Do you want to build solutions for the biggest names in the finance industry? Our public and private sites generate over 2 billion hits per week. If you manage your investments online, you may already be using our solutions. 
  
  What’s in it for you: 
  Do you want to build solutions for the biggest names in the finance industry? Our public and private sites generate over 2 billion hits per week. If you manage your investments online, you may already be using our solutions. 
  Do you want to lead teams that create modern web applications with cutting edge UI/UX designs? Our team of 40+ designers work closely with our engineering teams to design and build the next generation of online of experiences for finance. 
  Are you looking for an exciting and engaging place to work? A place where you can continue to grow your skills, in a stable environment where we put our people first? We’ve been in business for over 25 years and continue to be the premier provider of digital solutions for the financial industry today. `);
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	const handleMutate = trpc.jarvis.questionAnswer.useMutation();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response: NSFWResType = await handleMutate.mutateAsync({
			question,
			experience,
			jobDescription,
		});
		if (response.status < 300) {
			setAppropriateMsg(response.data);
			console.log(response);
		}
	};

	return (
		<div>
			<h1>Frequently</h1>
			<h1>Asked</h1>
			<h1>Questions</h1>
			<h3>Get a professional response for Job question</h3>
			<p>Instructions:</p>
			<ul>
				<li>Type a question in the field</li>
				<li>Provide experience</li>
				<li>Provide job posting</li>
				<li>click submit when done</li>
				<li>Copy text generated below</li>
			</ul>
			<StyledForm onSubmit={handleSubmit}>
				<input
					name='Question'
					value={question}
					placeholder={'Example... Why do you want to work here? '}
					onChange={(e) => {
						setQuestion(e.target.value);
					}}
				/>
				<input
					name='Experience'
					value={experience}
					placeholder='Example... I taught a full stack web development course for Concordia University which taught React Express Node and MongoDb. '
					onChange={(e) => {
						setExperience(e.target.value);
					}}
				/>
				<textarea
					name='Job'
					value={jobDescription}
					placeholder='Enter job posting'
					onChange={(e) => {
						setJobDescription(e.target.value);
					}}
				/>
				<button type='submit'>Submit</button>
			</StyledForm>
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

export default FAQ;
const StyledCopy = styled.div`
	padding: var(--lg-padding);
	border: 1px solid green;
	position: relative;
	h4 {
		border: 1px solid yellow;
		margin-right: 28px;
	}
`;

const StyledCopyButton = styled(StyledIconContainer)`
	position: absolute;
	top: var(--sm-padding);
	right: var(--sm-padding);
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 8px;
	input,
	textarea {
		padding: 12px;
	}
	textarea {
		min-height: 100px;
	}
`;
