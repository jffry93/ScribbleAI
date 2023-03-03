import { useAuthContext } from '../../hooks/useAuthContext';
import Instructions from './Instructions';
import UserInfo from './UserInfo';

const DisplayInfo = () => {
	const {
		state: { user },
	} = useAuthContext();
	console.log(user?.preference?.experience);
	return <>{user?.preference?.experience ? <UserInfo /> : <Instructions />}</>;
};

export default DisplayInfo;
