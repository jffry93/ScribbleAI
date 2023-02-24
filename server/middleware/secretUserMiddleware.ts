import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { t } from '../trpc';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma } from '../db';
dotenv.config();

const SECRET = process.env.SECRET || 'default-secret-value';

const secretUserMiddleware = t.middleware(async ({ ctx, next }) => {
	const { authorization } = ctx.req.headers;
	if (!authorization) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	const token = authorization.split(' ')[1];
	// try {
	const jwtData = jwt.verify(token, SECRET);
	if (typeof jwtData === 'string') {
		throw new TRPCError({ code: 'CONFLICT' });
	}
	const { _id } = jwtData;

	//select returns object with keys specified
	const userId = await prisma.user.findFirst({
		where: { id: _id },
		include: { Preference: true },
	});

	if (!userId) {
		throw new TRPCError({ code: 'FORBIDDEN' });
	}
	// only people i know can spend my money
	if (ctx.secretUsers && !ctx.secretUsers.includes(userId?.email)) {
		throw new Error('Please send me an email so I can give u access');
	}

	console.log('ITS A MATCH ❤️');
	return next({ ctx: { user: { ...userId, token } } });
});

export const secretUserProcedure = t.procedure.use(secretUserMiddleware);
