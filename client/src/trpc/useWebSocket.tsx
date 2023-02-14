import { trpc } from './trpc';

const useWebSocket = () => {
	const data = trpc.user.onUpdate.useSubscription(undefined, {
		onData: (id) => {
			console.log('updated the user with id ', id);
		},
	});
	console.log(data);
	return;
};

export default useWebSocket;
