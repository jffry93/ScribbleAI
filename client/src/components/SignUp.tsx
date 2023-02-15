import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const SignUp = () => {
	const {
		state: { user },
	} = useAuthContext();
	const { logout } = useLogout();

	return (
		<div>
			<p
				onClick={() => {
					if (user?.token) {
						return logout();
					}
					console.log('first');
				}}
			>
				{user?.token ? 'Logout' : 'SIGN UP'}
			</p>
		</div>
	);
};

export default SignUp;
