import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { trpc } from './trpc';
const { VITE_API_URL, VITE_API_WSURL } = import.meta.env;

const FetchProvider = ({ children }: { children: ReactNode }) => {
	const {
		state: { user },
	} = useAuthContext();

	const [queryClient] = useState(() => new QueryClient());
	const [wsClient] = useState(() =>
		createWSClient({
			url: VITE_API_WSURL + '/trpc',
		})
	);
	const httpBatchLinkConfig = useMemo(() => {
		const headers = { authorization: `Bearer ${user?.token}` };
		return { url: VITE_API_URL + '/trpc', headers };
	}, [user?.token]);

	const trpcClient = useMemo(() => {
		return trpc.createClient({
			links: [
				splitLink({
					condition: (op) => {
						return op.type === 'subscription';
					},
					true: wsLink({
						client: wsClient,
					}),
					false: httpBatchLink(httpBatchLinkConfig),
				}),
			],
		});
	}, [httpBatchLinkConfig]);

	useEffect(() => {
		async function webSocketServer() {
			// wsClient.close();
		}
		webSocketServer();
	}, []);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
};

export default FetchProvider;
