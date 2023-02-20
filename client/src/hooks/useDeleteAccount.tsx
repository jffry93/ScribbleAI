import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../trpc/trpc';
import { useAuthContext } from './useAuthContext';

interface DeleteRes {
	status: number;
	msg: string;
}

export const useDeleteAccount = () => {
	const [isLoading, setIsLoading] = useState<null | boolean>(null);
	const [error, setError] = useState<null | boolean>(null);
	const [errorMsg, setErrorMsg] = useState('');
	const {
		dispatch,
		state: { user },
	} = useAuthContext();
	const navigate = useNavigate();

	const handleDelete = trpc.user.deleteUser.useMutation();
	const handleLogin = trpc.user.login.useMutation();
	const deleteAccount = async () => {
		// const token = localStorage.getItem('token');
		const { email, token } = JSON.parse(localStorage.getItem('user') || '{}');
		console.log(user?.email);
		console.log(email);
		if (user?.email !== email) {
			throw new Error('Theres some funny business emails dont match');
		}
		if (!email || !token) {
			throw new Error('Theres nothing to send and delete');
		}
		try {
			setIsLoading(true);
			setError(null);
			const data: DeleteRes = await handleDelete.mutateAsync({
				email: email,
				token: token,
			});
			console.log(data);
			if (data.status > 200) {
				setIsLoading(false);
				setError(true);
				setErrorMsg(data.msg);
			} else {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setError(true);
				setIsLoading(false);
				setErrorMsg('✅ Successfully deleted account');
				await new Promise((resolve) => setTimeout(resolve, 1400));
				setErrorMsg('We hope you come back');
				await new Promise((resolve) => setTimeout(resolve, 1400));
				setErrorMsg('Byeeeeeee 👋🏽');
				await new Promise((resolve) => setTimeout(resolve, 1000));
				dispatch({ type: 'LOGOUT', payload: undefined });
				// remove token in local storage
				localStorage.removeItem('user');
				// remove state from context
				//RESET
				setError(false);
				setIsLoading(false);
				navigate('/');
			}
		} catch (error) {
			console.log('error in delete account function');
			setError(true);
			setIsLoading(false);
		}
	};
	return { deleteAccount, status: { isLoading, error, errorMsg } };
};
