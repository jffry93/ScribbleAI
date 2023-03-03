import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const LoginButton = () => {
	const {
		state: { user },
	} = useAuthContext();
	const { logout } = useLogout();
	const navigate = useNavigate();
	return (
		<StyledText
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
		</StyledText>
	);
};

export default LoginButton;

const StyledText = styled.a`
	cursor: pointer;
`;
