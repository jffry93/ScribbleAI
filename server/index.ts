import { Request, Response } from 'express';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { appRouter } from './routers';
import { createContext } from './libs/trpc/context';
import ws from 'ws';
require('dotenv').config();
interface CustomEnv extends NodeJS.ProcessEnv {
	API_ORIGINS: string;
	SECRET_USERS: string;
	PORT: string;
	// Add other environment variables here as needed
}
const { API_ORIGINS, SECRET_USERS, PORT }: CustomEnv =
	process.env as unknown as CustomEnv;
const port = PORT || 3000;
const app = express();
// MIDDLEWARE
app.use(
	cors({
		origin: API_ORIGINS.split(','),
	})
);
app.use(cors());
app.use(morgan('tiny'));

app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext }));

// 404 ERROR
app.use('*', (req, res) => {
	res.status(404).json({
		status: 404,
		message: 'This is obviously not what you are looking for.',
	});
});

const server = app.listen(port);
const createWSContext = (): {
	req: Request;
	res: Response;
	isAdmin: boolean;
	secretUsers: string[];
	// pokemon: number;
} => {
	// Here, you can create and return an object with the required properties
	return {
		req: {} as Request,
		res: {} as Response,
		isAdmin: false,
		secretUsers: SECRET_USERS.split(','),
		// pokemon: 0,
	};
};
applyWSSHandler({
	wss: new ws.Server({ server }),
	router: appRouter,
	createContext: createWSContext,
});

export type AppRouter = typeof appRouter;
