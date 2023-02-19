import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { t } from '../trpc';

export const legitCheckMiddleware = t.middleware(({ ctx, next }) => {
	if (ctx.isAdmin === false) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({ ctx: { user: { id: 1 } } });
});
