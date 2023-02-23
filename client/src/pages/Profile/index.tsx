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
						{lockIcon ? <UserInfo /> : <UpdateUser setLockIcon={setLockIcon} />}
					</StyledDiv>
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
	min-height: var(--container-height);
	padding: var(--layout-padding);
	position: relative;
	h2 {
		margin-bottom: 24px;
	}
`;

const StyledDiv = styled.div`
	display: flex;
	width: 100%;
	max-width: 800px;
`;
