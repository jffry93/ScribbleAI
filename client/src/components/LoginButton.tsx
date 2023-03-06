import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const LoginButton = () => {
	const {
		state: { user },
	} = useAuthContext();
	const { logout } = useLogout();
	const navigate = useNavigate();
	return (
		<Typography
			className='title'
			onClick={() => {
				if (user?.token) {
					return logout();
				} else {
					navigate('/login');
				}
			}}
		>
			{user?.token ? 'LOGOUT' : 'LOGIN'}
		</Typography>
	);
};

export default LoginButton;
