import { trpc } from '../trpc';

// Async Mutate Example
export const useAsyncMutate = (email: string) => {
	const handleAsyncPost = trpc.asyncExample.mutateExample.useMutation();
	const onAsyncMutate = async () => {
		try {
			const data = await handleAsyncPost.mutateAsync({
				email,
			});
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	return onAsyncMutate;
};
