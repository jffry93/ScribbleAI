import { useState } from 'react';
import styled from 'styled-components';
import Lock from '../../components/Lock';
import { useAuthContext } from '../../hooks/useAuthContext';

import DeleteAccount from './DeleteAccount';
import LabelTitle from './LabelTitle';
import ProfileImage from './ProfileImage';
import UpdateUser from './UpdateUser';
import UserInfo from './UserInfo';

const Profile = () => {
	const [lockIcon, setLockIcon] = useState(true);
	const {
		state: { user },
	} = useAuthContext();

	return (
		<StyledProfile>
			{user?.preference && (
				<>
					<Lock lockIcon={lockIcon} setLockIcon={setLockIcon} />
					<h2>User Information</h2>
					<StyledDiv>
						<ProfileImage />
						{lockIcon ? <UserInfo /> : <UpdateUser setLockIcon={setLockIcon} />}
					</StyledDiv>
					<DeleteAccount />
				</>
			)}
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
