import React, { useState } from 'react';
import styled from 'styled-components';
import FormInput from '../../components/FormInput';
import { useAuthContext } from '../../hooks/useAuthContext';
import { trpc } from '../../trpc/trpc';
import ErrorMsg from '../../components/ErrorMsg';
import ProfileImage from './ProfileImage';

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
				<StyledForm onSubmit={handleSubmit}>
					<StyledDiv>
						<ProfileImage />
						<StyledContainer>
							{error.status && <ErrorMsg msg={error.msg} />}
							<StyledField className={handleError('name') ? 'error' : ''}>
								<label>Name: </label>
								<FormInput
									state={name}
									setState={setName}
									placeholder={'add a name'}
								/>
							</StyledField>
							<StyledFieldTextArea
								className={handleError('experience') ? 'error' : ''}
							>
								<label>Past Experience:</label>
								<textarea
									name='Experience'
									value={experience}
									placeholder='Example... I taught a full stack web development course for Concordia University which taught React Express Node and MongoDb. '
									onChange={(e) => {
										setExperience(e.target.value);
									}}
								/>
							</StyledFieldTextArea>
							<StyledFieldTextArea
								className={handleError('personality') ? 'error' : ''}
							>
								<label>Personality:</label>
								<textarea
									name='Personality'
									value={personality}
									placeholder='Example... I taught a full stack web development course for Concordia University which taught React Express Node and MongoDb. '
									onChange={(e) => {
										setPersonality(e.target.value);
									}}
								/>
							</StyledFieldTextArea>
						</StyledContainer>
					</StyledDiv>
					<StyledLink className={handleError('github') ? 'error' : ''}>
						<label>Github: </label>
						<FormInput
							state={github}
							setState={setGithub}
							placeholder={'add github profile'}
						/>
					</StyledLink>
					<StyledLink className={handleError('linkedin') ? 'error' : ''}>
						<label>Linkedin: </label>
						<FormInput
							state={linkedin}
							setState={setLinkedin}
							placeholder={'add linkedin profile'}
						/>
					</StyledLink>
					<StyledLink className={handleError('additional') ? 'error' : ''}>
						<label>Additional: </label>
						<FormInput
							state={additional}
							setState={setAdditional}
							placeholder={'include additional site'}
						/>
					</StyledLink>
					<button type='submit'>Update</button>
				</StyledForm>
			)}
		</>
	);
};

export default UpdateUser;

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const StyledDiv = styled.div`
	display: flex;
	width: 100%;
	border: 1px solid red;
`;

const StyledForm = styled.form`
	flex: 1;
	display: flex;
	flex-direction: column;
	input,
	textarea {
		padding: var(--sm-padding);
	}
	textarea {
		height: 100%;
	}
	button {
		margin-top: 8px;
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
	padding: var(--sm-padding);
	label {
		min-width: 72px;
	}
	input {
		width: 100%;
	}
`;
const StyledFieldTextArea = styled(StyledField)`
	height: 100%;
`;
