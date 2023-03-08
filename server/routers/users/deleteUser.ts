import { z } from 'zod';
import { prisma } from '../../prisma/db';
import jwt from 'jsonwebtoken';
import { SECRET } from '../users';
import { legitCheckProcedure } from '../../middleware/legitCheckMiddleware';

export const deleteUser = legitCheckProcedure
	.input(z.object({ email: z.string(), token: z.string() }))
	.mutation(async ({ input }) => {
		const { email, token } = input;
		try {
			console.log('first');
			// check that correct things are stored in local storage
			if (!email || !token) {
				throw Error("😳 Data must've been tampered. Something is missing 😭");
			}
			//compare userInfo
			const userInfo = await prisma.user.findFirst({
				where: { email },
			});

			const jwtData = jwt.verify(token, SECRET);
			if (typeof jwtData === 'string') {
				throw new Error('Invalid token');
			}
			console.log('second');
			const { _id } = jwtData;
			if (userInfo?.id !== _id) {
				throw new Error("Token doesn't match userId");
			}
			console.log('ITS A MATCH ❤️');
			// DELETE
			await prisma.user.delete({ where: { email } });
			return {
				status: 200,
				msg: '✅ Successful deleted account',
			};
		} catch (err) {
			console.log((err as Error).message);
			return {
				status: 400,
				msg: (err as Error).message,
			};
		}
	});
