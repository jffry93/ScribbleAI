import { useState } from 'react';
import styled from 'styled-components';
import Lock from '../../components/Lock';
import { useAuthContext } from '../../hooks/useAuthContext';

import DeleteAccount from './DeleteAccount';
import LabelTitle from './LabelTitle';
import ProfileImage from './ProfileImage';

const Profile = () => {
	const [lockIcon, setLockIcon] = useState(true);
	const {
		state: { user },
	} = useAuthContext();
	console.log(user);
	return (
		<StyledProfile>
			<Lock lockIcon={lockIcon} setLockIcon={setLockIcon} />
			<h2>User Information</h2>
			<StyledDiv>
				<ProfileImage />
				<StyledContainer>
					<LabelTitle text={'Jeffrey'} label={'Name'} />
					<p>Email</p>
					<p>Experience</p>
					<p>Personality</p>
					<p>Joined on</p>
				</StyledContainer>
			</StyledDiv>
			<DeleteAccount />
		</StyledProfile>
	);
};

export default Profile;

const StyledProfile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 32px;
	border: 1px solid green;
	min-height: var(--container-height);
	padding: var(--layout-padding);
	position: relative;
`;

const StyledDiv = styled.div`
	display: flex;
	width: 100%;
	border: 1px solid red;
`;
const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;
