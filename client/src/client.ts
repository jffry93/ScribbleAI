import {
	createTRPCProxyClient,
	httpBatchLink,
	splitLink,
	createWSClient,
	wsLink,
} from '@trpc/client';
import { AppRouter } from '../../server/index';

const wsClient = createWSClient({
	url: 'ws://localhost:3000/trpc',
});

const client = createTRPCProxyClient<AppRouter>({
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
});

document.addEventListener('click', async () => {
	// client.users.update.mutate({ userId: '123i76123', name: 'Lord QueeQuee' });
	const res = await client.test.mutate({
		email: 'jay@some.thing',
		name: 'Jay',
	});
	console.log(res);
});

async function webSocketServer() {
	client.users.onUpdate.subscribe(undefined, {
		onData: (id) => {
			console.log('updated the user with id ', id);
		},
	});
	wsClient.close();
}
webSocketServer();
