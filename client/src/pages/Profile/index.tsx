import styled from 'styled-components';
import { useAuthContext } from '../../hooks/useAuthContext';
import ProfileImage from './ProfileImage';

const Profile = () => {
	const {
		state: { user },
	} = useAuthContext();
	console.log(user);
	return (
		<StyledProfile>
			<ProfileImage />
			<h2>Section to set and update preference</h2>
		</StyledProfile>
	);
};

export default Profile;

const StyledProfile = styled.div`
	display: flex;
	gap: 32px;
	border: 1px solid green;
	min-height: var(--container-height);
	padding: var(--layout-padding);
`;
