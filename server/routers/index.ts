import { adminProcedure, t } from '../trpc';
import { userRouter } from './users';

export const appRouter = t.router({
	sayHi: t.procedure.query(() => {
		return 'Waddup dawg!!!!🐶';
	}),
	logToServer: t.procedure
		//check schema
		.input((v) => {
			if (typeof v === 'string') return v;

			throw new Error('Invalid input: Expected string');
		})
		.mutation((req) => {
			console.log('Client says: ' + req.input);
			return true;
		}),
	secretData: adminProcedure.query(({ ctx }) => {
		console.log(ctx.user);
		return 'Shhhhhhhh secret 🤫...';
	}),
	users: userRouter,
});
