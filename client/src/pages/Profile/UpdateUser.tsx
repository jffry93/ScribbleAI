import React, { useState } from 'react';
import styled from 'styled-components';
import FormInput from '../../components/FormInput';
import { useAuthContext } from '../../hooks/useAuthContext';
import { trpc } from '../../trpc/trpc';
import ErrorMsg from '../../components/ErrorMsg';
import ProfileImage from './ProfileImage';
import DeleteAccount from './DeleteAccount';
import { FaGithubAlt, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineLink } from 'react-icons/ai';
import { device } from '../../GlobalStyles';
import { Button, TextField, Typography } from '@mui/material';
import { LabelProps } from '../../components/Form';

interface ErrorObject {
	status: boolean;
	msg: string;
	labels: string[];
}
type Props = {
	setLockIcon: (value: boolean) => void;
};

const UpdateUser = ({ setLockIcon }: Props) => {
	const {
		state: { user },
		dispatch,
	} = useAuthContext();
	const [error, setError] = useState<ErrorObject>({
		status: false,
		msg: '',
		labels: [''],
	});
	const [name, setName] = useState(user?.preference.name || '');
	const [experience, setExperience] = useState(
		user?.preference.experience || ''
	);
	const [personality, setPersonality] = useState(
		user?.preference.personality || ''
	);
	const [github, setGithub] = useState(user?.preference.links.github || '');
	const [linkedin, setLinkedin] = useState(
		user?.preference.links.linkedin || ''
	);
	const [additional, setAdditional] = useState(
		user?.preference.links.additional || ''
	);

	const handleUpdateUser = trpc.user.updateUser.useMutation();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const data: {
				status: number;
				preference?: {
					experience: string;
					personality: string;
					name: string;
					links: Record<string, string>;
				};
				msg: string;
			} = await handleUpdateUser.mutateAsync({
				name,
				experience,
				personality,
				github,
				linkedin,
				additional,
			});
			console.log(data);
			if (data.status === 200) {
				console.log('Success');
				const { preference } = data;

				dispatch({
					type: 'UPDATE',
					payload: preference,
				});
				setLockIcon(true);
			} else {
				setError({
					status: true,
					msg: data.msg,
					labels: [''],
				});
			}
		} catch (err) {
			const json = JSON.parse((err as Error).message);
			const errorObject: { status: boolean; msg: string; labels: string[] } = {
				status: true,
				msg: json[0].message,
				labels: [],
			};
			json.forEach((item: { path: string[] }) => {
				console.log(item);
				if (typeof item.path[0] === 'string')
					errorObject.labels = [...errorObject.labels, item.path[0]];
			});
			setError(errorObject);
			// console.log(typeof (err as Error).message);
		}
	};

	const handleError = (text: string) => {
		if (error.labels.length) {
			return error.labels.includes(text.toLowerCase());
		}
	};
	return (
		<>
			{user?.preference && (
				<>
					<StyledForm onSubmit={handleSubmit}>
						<ErrorMsg data={{ msg: error.msg, status: error.status }} />
						<StyledDiv>
							<ProfileImage />
							<StyledContainer>
								<StyledField className={handleError('name') ? 'error' : ''}>
									<Typography
										sx={{
											pl: 1,
											pb: 1,
										}}
									>
										Name: <span>Required*</span>
									</Typography>
									<FormInput
										state={name}
										setState={setName}
										placeholder={"What's your name?"}
									/>
								</StyledField>
								<StyledFieldTextArea
									className={handleError('experience') ? 'error' : ''}
								>
									<Typography
										sx={{
											pl: 1,
											pb: 1,
										}}
									>
										Experience: <span>Required*</span>
									</Typography>
									<TextField
										multiline
										name='Experience'
										value={experience}
										placeholder='Include some past experience.
Example... I taught a full stack web development course for Concordia University which taught React Express Node and MongoDb. '
										onChange={(e) => {
											setExperience(e.target.value);
										}}
									/>
								</StyledFieldTextArea>
								<StyledFieldTextArea
									className={handleError('personality') ? 'error' : ''}
								>
									<Typography
										sx={{
											pl: 1,
											pb: 1,
										}}
									>
										Personality: <span>Required*</span>
									</Typography>
									<TextField
										multiline
										value={personality}
										placeholder='Tell us about yourself.
Example... I taught a full stack web development course for Concordia University which taught React Express Node and MongoDb. '
										onChange={(e) => {
											setPersonality(e.target.value);
										}}
									/>
								</StyledFieldTextArea>
							</StyledContainer>
						</StyledDiv>
						<StyledLinkInfo>
							<Typography variant='h4' sx={{ my: '32px' }}>
								Clipboard Links
							</Typography>
							<StyledLink className={handleError('github') ? 'error' : ''}>
								<FaGithubAlt size={25} />
								<label>Github: </label>
								<FormInput
									state={github}
									setState={setGithub}
									placeholder={'Add Github URL'}
								/>
							</StyledLink>
							<StyledLink className={handleError('linkedin') ? 'error' : ''}>
								<FaLinkedinIn size={25} />
								<label>Linkedin:</label>
								<FormInput
									state={linkedin}
									setState={setLinkedin}
									placeholder={'Add Linkedin URL'}
								/>
							</StyledLink>
							<StyledLink className={handleError('additional') ? 'error' : ''}>
								<AiOutlineLink size={25} />
								<label>Additional: </label>
								<FormInput
									state={additional}
									setState={setAdditional}
									placeholder={'Include Additional URL'}
								/>
							</StyledLink>
						</StyledLinkInfo>
						<Button type='submit'>Update</Button>
						<DeleteAccount />
					</StyledForm>
				</>
			)}
		</>
	);
};

export default UpdateUser;

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	flex: 1;
`;

const StyledDiv = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	gap: 32px;
	margin-top: 16px;
`;

const StyledForm = styled.form`
	flex: 1;
	display: flex;
	flex-direction: column;

	label {
		/* margin-top: 4px; */
		font-size: 20px;
		font-weight: 600;
	}
	input,
	textarea {
		min-width: 250px;
		padding: 0;
	}
	textarea {
		min-height: 120px;
		height: 100%;
	}
	button {
		padding: 12px;
		/* padding: 16px 0 24px; */
		margin-top: 16px;
	}
`;

const StyledField = styled.div`
	display: flex;
	flex-direction: column;
	&.error {
		color: var(--error);
		input,
		textarea {
			height: 100%;
			border: 1px solid var(--error);
			border-radius: 4px;
		}
	}
`;

const StyledLink = styled.div`
	display: flex;
	align-items: center;
	gap: var(--sm-padding);
	/* padding: 8px 0; */

	h4 {
		padding: var(--sm-padding);
	}
	label {
		min-width: 100px;
	}
	input {
		width: 100%;
	}
	svg {
		min-width: 25px;
	}
	@media ${device.mobile} {
		label {
			display: none;
		}
	}
`;
const StyledLinkInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	/* margin-top: var(--lg-padding); */
	h3 {
		/* margin: var(--md-padding) var(--sm-padding); */
	}
	width: 100%;
`;
const StyledFieldTextArea = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	textarea {
		height: 100%;

		border-radius: 4px;
	}
	/* min-height: 180px; */
`;
