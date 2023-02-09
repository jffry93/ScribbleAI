# BACKEND

```
📦server
 ┣ 📂routers
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜users.ts
 ┣ 📜README.md
 ┣ 📜context.ts
 ┣ 📜index.ts
 ┣ 📜package.json
 ┣ 📜pnpm-lock.yaml
 ┗ 📜trpc.ts
```

# 📙 Summary

TRPC connects with Express as the adapter.

# 🧠 Setup TRPC

> Step 1:
>
> Below is an example of how to connect to express and set up endpoints to call

```json
//allows user to express
import { createExpressMiddleware } from '@trpc/server/adapters/express';
// different api routes to call
import { appRouter } from './routers';
app.use(
	'/trpc', //   === http://localhost:3000/trpc/
	createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

```

> Step 2:
>
> Initialize TRPC server
> Create a trpc.ts file in the root which will be used to create the routes
> the example below is creating a context and middleware that will update value of context object if admin is true

```json
import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { createContext } from './context';

export const t = initTRPC
	.context<inferAsyncReturnType<typeof createContext>>()// === ctx
	.create();

// create middleware
// checks context passed returns updated ctx object
const isAdminMiddleware = t.middleware(({ ctx, next }) => {
	if (ctx.isAdmin === false) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({ ctx: { user: { id: 1 } } });
});

export const adminProcedure = t.procedure.use(isAdminMiddleware);

```

### Context Details

> Use the inferAsyncReturnType and pass the context as the type
> You are able to use this ctx key which will hold the object that was returned from the context file
> ctx is available in .middleWare() .query() .mutation() and more
> by default this is an empty object

```json
import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { createContext } from './context';

export const t = initTRPC
	.context<inferAsyncReturnType<typeof createContext>>()// === ctx
	.create();

```

> Step 3:
>
> Next set up the routes. Below is an example of the index file for routers folder
> There is both a GET and POST example below

```json
//import the initialized trpc function
import { t } from '../trpc';

export const appRouter = t.router({
  // GET REQUEST http://localhost:3000/trpc/sayHi
	sayHi: t.procedure.query(() => {
		return 'Waddup dawg!!!!🐶';
	}),

  // POST REQUEST http://localhost:3000/trpc/logToServer?batch=1
	logToServer: t.procedure
		.input((v) => { // checks schema of the input sent from the frontend
			if (typeof v === 'string') return v;
			throw new Error('Invalid input: Expected string');
		})
		.mutation((req) => { // chane data
			console.log('Client says: ' + req.input);
			return true;
		}),
});

```

> Step 4:
>
> Call the endpoints from your frontend!!

```json
import {
	createTRPCProxyClient,
	httpBatchLink,
} from '@trpc/client';
import { AppRouter } from '../../server/index';

const client = createTRPCProxyClient<AppRouter>({
	links: [
		 httpBatchLink({
				url: 'http://localhost:3000/trpc',
			}),
	],
});
document.addEventListener('click', async () => {
	const res = await client.logToServer.mutate('hello from the frontend ❤️');
	console.log(res);
});

```

# EXAMPLES

### QUERY DETAILS

> This an example of how to do a "GET" request

```json
//import the initialized trpc function
import { t } from '../trpc';

export const appRouter = t.router({
  // Example of the route http://localhost:3000/trpc/sayHi
	sayHi: t.procedure.query(() => {
		return 'Waddup dawg!!!!🐶';
	}),
  // frontend example
  // const res = await client.sayHi.query();
	// console.log(res); === 'Waddup dawg!!!!🐶'
  // the frontend does not require an argument to be passed
});

```

### MUTATION DETAILS

> This an example of how to do a "GET" request

```json
//import the initialized trpc function
import { t } from '../trpc';

export const appRouter = t.router({
  // POST endpoint http://localhost:3000/trpc/logToServer
	logToServer: t.procedure
		// checks schema of the input sent from the frontend
		.input((v) => {
			if (typeof v === 'string') return v;

			throw new Error('Invalid input: Expected string');
		})
		.mutation((req) => {
			console.log('Client says: ' + req.input);
			return true;
		}),
    // frontend example
    //❗️❗️ the user must pass a STRING ❗️❗️
    // const res = await client.logToServer.mutate('something');
	  // console.log(res); === true
});

```

You can visit the documentation by clicking [here](https://trpc.io)
