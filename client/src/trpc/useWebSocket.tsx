import { trpc } from './trpc';

const useWebSocket = () => {
	return trpc.user.onUpdate.useSubscription(undefined, {
		onData: (id) => {
			console.log('updated the user with id ', id);
		},
	});
};

export default useWebSocket;
