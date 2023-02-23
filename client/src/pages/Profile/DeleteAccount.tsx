import React from 'react';
import LoadingModal from '../../components/LoadingModal';
import { useDeleteAccount } from '../../hooks/useDeleteAccount';

const DeleteAccount = () => {
	const { deleteAccount, status } = useDeleteAccount();
	console.log(status.complete);
	return (
		<>
			{status.error && <p>{status.errorMsg}</p>}
			<button onClick={deleteAccount}>Delete Account</button>
			{status.isLoading && (
				<LoadingModal
					title={status.complete.title}
					subtitle={status.complete.subtitle}
				/>
			)}
		</>
	);
};

export default DeleteAccount;
