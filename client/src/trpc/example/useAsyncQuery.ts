import { trpc } from '../trpc';

export const useAsyncQuery = (email: string) => {
	// Async Query Example
	const handleAsyncQuery = trpc.asyncExample.queryExample.useQuery({
		email,
	});
	const onAsyncQuery = async () => {
		try {
			const res = await handleAsyncQuery.refetch();
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	return onAsyncQuery;
};
