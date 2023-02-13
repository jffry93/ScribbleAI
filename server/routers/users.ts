import { t } from '../trpc';
import { z } from 'zod';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'stream';
import { prisma } from '../db';

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));
const eventEmitter = new EventEmitter();

export const userRouter = t.router({
	get: userProcedure.query(({ input }) => {
		return { id: input.userId };
	}),
	//localhost:3000/trpc/user/signUp
	signUp: t.procedure
		.input(z.object({ email: z.string() }))
		.mutation(async (req) => {
			const { email } = req.input; // ===req.body
			const res = await prisma.user.create({
				data: {
					email,
					name: 'this is an optional string',
				},
			});
			console.log(res);
			return {
				res,
			};
		}),
	update: userProcedure
		.input(z.object({ name: z.string() }))
		.output(z.object({ name: z.string(), id: z.string() }))
		.mutation((req) => {
			console.log(
				'update name for user ID ' +
					req.input.userId +
					' to the new name ' +
					req.input.name
			);
			eventEmitter.emit('update', req.input.userId);
			return {
				id: req.input.userId,
				name: req.input.name,
				password: 'this is not included in output',
			};
		}),
	//web socket to listen to changes whenever update path is called
	onUpdate: t.procedure.subscription(() => {
		return observable<string>((emit) => {
			eventEmitter.on('update', emit.next);
			//return is when we close the web socket server like useEffect
			return () => {
				eventEmitter.off('update', emit.next);
			};
		});
	}),
});
