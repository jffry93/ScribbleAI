import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client';
import React, { ReactNode, useEffect, useState } from 'react';
import { trpc } from './trpc';
const FetchProvider = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient());
	const [wsClient] = useState(() =>
		createWSClient({
			url: 'ws://localhost:3000/trpc',
		})
	);
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				splitLink({
					condition: (op) => {
						return op.type === 'subscription';
					},
					true: wsLink({
						client: wsClient,
					}),
					false: httpBatchLink({
						url: 'http://localhost:3000/trpc',
					}),
				}),
			],
		})
	);

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
