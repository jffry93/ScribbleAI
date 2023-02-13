import { t } from '../trpc';
import { z } from 'zod';
import { prisma } from '../db';

const chainProducerExample = t.procedure.input(
	z.object({ userId: z.string() })
);

export const asyncExampleRouter = t.router({
	queryExample: t.procedure
		.input(z.object({ email: z.string() }))
		.query(async ({ input }) => {
			try {
				console.log(input.email);
				const data = await prisma.user.findFirst({
					where: {
						email: input.email,
					},
				});
				if (data) {
					return { data, msg: '🕵🏽🕵🏽🕵🏽 --- User Found --- 🔍🔍🔍' };
				} else {
					throw new Error('❌❌❌ --- User NOT Found --- ❌❌❌');
				}
			} catch (error) {
				return {
					error,
					msg: '❌❌❌ --- User NOT Found --- ❌❌❌',
				};
			}
		}),
	mutateExample: t.procedure
		.input(z.object({ email: z.string() }))
		.mutation(async (req) => {
			try {
				const { email } = req.input;
				console.log(email);
				const data = await prisma.user.create({
					data: {
						email,
						name: 'this is an optional string',
					},
				});
				console.log(data);
				return {
					data,
					msg: '✅✅✅ --- User Created --- ✅✅✅',
				};
			} catch (error) {
				return {
					error,
					msg: '❌❌❌ --- There was an error adding to prisma --- ❌❌❌',
				};
			}
		}),
});
