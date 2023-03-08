import { adminProcedure, t } from '../libs/trpc';
import { userRouter } from './users';
import { jarvisRouter } from './jarvis';

export const appRouter = t.router({
	secretData: adminProcedure.query(({ ctx }) => {
		return 'Shhhhhhhh secret 🤫...';
	}),
	user: userRouter,
	jarvis: jarvisRouter,
});
