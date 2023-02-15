import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../trpc/trpc';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
	const [isLoading, setIsLoading] = useState<null | boolean>(null);
	const [error, setError] = useState<null | boolean>(null);
	const [errorMsg, setErrorMsg] = useState('');
	const { dispatch } = useAuthContext();
	const navigate = useNavigate();
	const handleLogin = trpc.user.login.useMutation();
	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await handleLogin.mutateAsync({
				email,
				password,
			});
			console.log(data);
			if (data.status > 200) {
				setIsLoading(false);
				setError(true);
				setErrorMsg(data.msg);
			} else {
				// save token to local storage
				localStorage.setItem('user', JSON.stringify(data));
				//update state
				dispatch({ type: 'LOGIN', payload: data });
				setIsLoading(false);
				setErrorMsg('✅ Successful login');
				setError(true);
				navigate('/');
			}
		} catch (error) {
			console.log('error in Login function');
		}
	};
	return { login, isLoading, error, errorMsg };
};
