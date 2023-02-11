import { adminProcedure, t } from '../trpc';
import { userRouter } from './users';
import { z } from 'zod';
import { prisma } from '../db';

export const appRouter = t.router({
	sayHi: t.procedure
		.input(
			z.object({
				name: z.string(),
			})
		)
		.query((req) => {
			const { name } = req.input;
			return 'Waddup ' + name + '!!!!🐶';
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
	test: t.procedure
		.input(z.object({ name: z.string(), email: z.string() }))
		.mutation(async (req) => {
			console.log(req.input);
			const result = await prisma.user.findMany();
			console.log(result);
			return 'true';
		}),
});
