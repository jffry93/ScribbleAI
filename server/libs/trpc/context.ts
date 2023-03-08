import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export function createContext({ req, res }: CreateExpressContextOptions) {
	const secretUsers = process.env.SECRET_USERS?.split(',');
	return {
		req,
		res,
		isAdmin: true,
		secretUsers,
	};
}
