import { Request, Response } from 'express';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { appRouter } from './routers';
import { createContext } from './context';
import ws from 'ws';

const app = express();

// MIDDLEWARE
app.use(
	cors({
		origin: [
			'https://future.website',
			'http://localhost:5173',
			'http://127.0.0.1:5173',
		],
	})
);
app.use(morgan('tiny'));

app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext }));

// 404 ERROR
app.use('*', (req, res) => {
	res.status(404).json({
		status: 404,
		message: 'This is obviously not what you are looking for.',
	});
});

const server = app.listen(3000);
const createWSContext = (): {
	req: Request;
	res: Response;
	isAdmin: boolean;
	pokemon: number;
} => {
	// Here, you can create and return an object with the required properties
	return {
		req: {} as Request,
		res: {} as Response,
		isAdmin: false,
		pokemon: 0,
	};
};
applyWSSHandler({
	wss: new ws.Server({ server }),
	router: appRouter,
	createContext: createWSContext,
});

export type AppRouter = typeof appRouter;
