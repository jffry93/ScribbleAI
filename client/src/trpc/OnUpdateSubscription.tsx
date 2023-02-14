import React from 'react';
import { trpc } from './trpc';

const OnUpdateSubscription = () => {
	const handleUserUpdate = trpc.user.update.useMutation();
	return (
		<button
			onClick={() =>
				handleUserUpdate.mutate({ name: 'Jeffrey Zaluisc', userId: '123' })
			}
		>
			Test Websocket
		</button>
	);
};

export default OnUpdateSubscription;
