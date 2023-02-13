import { z } from 'zod';
import { adminProcedure, t } from '../trpc';
import { asyncExampleRouter } from './asyncExamples';

export const appRouter = t.router({
	queryExample: t.procedure
		.input(
			z.object({
				name: z.string(),
			})
		)
		.query((req) => {
			const { name } = req.input;
			return 'Waddup ' + name + '!!!!🐶';
		}),
	mutateExample: t.procedure
		.input((v) => {
			if (typeof v === 'string') return v;
			throw new Error('Invalid input: Expected string');
		})
		.mutation((req) => {
			console.log('Client says: ' + req.input);
			return 'Server says: I read you message "' + req.input + '"';
		}),
	asyncExample: asyncExampleRouter,
	secretData: adminProcedure.query(({ ctx }) => {
		console.log(ctx.user);
		return 'Shhhhhhhh secret 🤫...';
	}),
});
