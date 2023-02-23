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
	const [complete, setComplete] = useState({
		title: 'Loading...',
		subtitle: 'Please be patient while the data is being processed.',
	});
	const {
		dispatch,
		state: { user },
	} = useAuthContext();
	const navigate = useNavigate();

	const handleDelete = trpc.user.deleteUser.useMutation();

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
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setIsLoading(false);
				setError(true);
				setErrorMsg(data.msg);
			} else {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				// setError(true);
				// setIsLoading(false);
				setComplete({
					title: '✅ Successfully deleted account',
					subtitle: 'We hope you come back',
				});
				console.log(complete);
				// setErrorMsg('✅ Successfully deleted account');
				await new Promise((resolve) => setTimeout(resolve, 2000));
				setComplete({
					title: '👋🏽',
					subtitle: 'Byeeeeeee',
				});
				// setErrorMsg('We hope you come back');
				await new Promise((resolve) => setTimeout(resolve, 2000));
				// setErrorMsg('Byeeeeeee 👋🏽');
				// await new Promise((resolve) => setTimeout(resolve, 1000));
				// remove token in local storage
				localStorage.removeItem('user');
				// remove state from context
				//RESET
				setError(false);
				setIsLoading(false);
				dispatch({ type: 'LOGOUT', payload: undefined });
				navigate('/');
			}
		} catch (error) {
			console.log('error in delete account function');
			setError(true);
			setIsLoading(false);
		}
	};
	return { deleteAccount, status: { isLoading, error, errorMsg, complete } };
};
