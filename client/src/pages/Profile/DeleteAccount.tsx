import { Button } from '@mui/material';
import React from 'react';
import LoadingModal from '../../components/LoadingModal';
import { useDeleteAccount } from '../../hooks/useDeleteAccount';

const DeleteAccount = () => {
	const { deleteAccount, status } = useDeleteAccount();
	return (
		<>
			{status.error && <p>{status.errorMsg}</p>}
			<Button
				onClick={(e) => {
					e.preventDefault();
					deleteAccount();
				}}
			>
				Delete Account
			</Button>
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
