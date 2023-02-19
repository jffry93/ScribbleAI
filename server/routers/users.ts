import { t } from '../trpc';
import { z } from 'zod';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'stream';
import { prisma } from '../db';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.SECRET || 'default-secret-value';

const createToken = (_id: string) => {
	return jwt.sign({ _id }, SECRET, { expiresIn: '3d' });
};

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));
const eventEmitter = new EventEmitter();

const signUp = {
	signUp: t.procedure
		.input(z.object({ email: z.string(), password: z.string() }))
		.mutation(async ({ input }) => {
			const { email, password } = input;

			try {
				console.log(input);
				// validation
				if (!email || !password) {
					throw Error('😳 all fields must be filled 😭');
				}
				if (!validator.isEmail(email)) {
					throw Error('😳 email not valid 😭');
				}
				if (!validator.isStrongPassword(password)) {
					throw Error(
						'😳 "Password must include at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long." 😭'
					);
				}
				// check database
				const legitCheck = await prisma.user.findFirst({ where: { email } });
				if (legitCheck) {
					throw Error('❌Email already in use 😑');
				}
				// hash password
				const salt = await bcrypt.genSalt(10);
				const hash = await bcrypt.hash(password, salt);
				const user = await prisma.user.create({
					data: {
						email,
						password: hash,
						Preference: { create: {} },
					},
					include: { Preference: true },
				});
				const token = createToken(user.id);

				const preference = user.Preference;
				return {
					status: 200,
					email,
					token,
					preference,
					msg: '✅ Successful signUp',
				};
			} catch (err) {
				console.log((err as Error).message);
				return {
					status: 400,
					msg: '❗️Issue with signUp❗️ oof...🤕 ' + (err as Error).message,
				};
			}
		}),
};

const login = {
	login: t.procedure
		.input(z.object({ email: z.string(), password: z.string() }))
		.mutation(async ({ input }) => {
			const { email, password } = input;
			try {
				console.log(input);
				// validation
				if (!email || !password) {
					throw Error('😳 all fields must be filled 😭');
				}
				if (!validator.isEmail(email)) {
					throw Error('😳 email not valid 😭');
				}
				// check database
				const user = await prisma.user.findFirst({
					where: { email },
					include: { Preference: true },
				});

				if (!user) {
					throw Error("❌Email already doesn't exist 😑");
				}
				// check if password matches hashed password

				const match = await bcrypt.compare(password, user.password);
				if (!match) {
					throw Error('❌Incorrect password 😑');
				}
				const token = createToken(user.id);

				const preference = user.Preference;
				return {
					status: 200,
					email,
					token,
					preference,
					msg: '✅ Successful signUp',
				};
			} catch (err) {
				console.log((err as Error).message);
				return {
					status: 400,
					msg: '❗️Issue with login oof...🤕 ' + (err as Error).message,
				};
			}
		}),
};
const deleteUser = {
	deleteUser: t.procedure
		.input(z.object({ email: z.string(), token: z.string() }))
		.mutation(async ({ input }) => {
			const { email, token } = input;
			try {
				// check that correct things are stored in local storage
				if (!email || !token) {
					throw Error('😳 all fields must be filled 😭');
				}
				//compare userInfo
				const userInfo = await prisma.user.findFirst({
					where: { email },
				});

				const jwtData = jwt.verify(token, SECRET);
				if (typeof jwtData === 'string') {
					throw new Error('Invalid token');
				}
				const { _id } = jwtData;
				if (userInfo?.id !== _id) {
					throw new Error("Token doesn't match userId");
				}
				console.log('ITS A MATCH ❤️');
				// DELETE
				const user = await prisma.user.delete({
					where: { email },
					include: { Preference: true },
				});
				return {
					status: 200,
					msg: '✅ Successful deleted account',
				};
			} catch (err) {
				console.log((err as Error).message);
				return {
					status: 400,
					msg: '❗️Issue with deleting account...🤕 ' + (err as Error).message,
				};
			}
		}),
};

export const userRouter = t.router({
	...signUp,
	...login,
	...deleteUser,
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
