import { t } from '../../trpc';
import { z } from 'zod';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { prisma } from '../../db';
import { createToken } from '../users';
import { delayAsync } from '../../delayAsync';

export const login = t.procedure
	.input(z.object({ email: z.string(), password: z.string() }))
	.mutation(async ({ input }) => {
		const { email, password } = input;
		try {
			// validation
			if (!email || !password) {
				await delayAsync();
				throw Error('😳 All fields must be filled 😭');
			}
			if (!validator.isEmail(email)) {
				await delayAsync();
				throw Error('😳 Email not valid 😭');
			}
			// check database
			const user = await prisma.user.findFirst({
				where: { email },
				include: { Preference: true },
			});

			if (!user) {
				await delayAsync();
				throw Error("❌ Email doesn't have an account 😑");
			}
			// check if password matches hashed password
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				await delayAsync();
				throw Error('❌ Incorrect password 😑');
			}
			const token = createToken(user.id);

			if (user.Preference !== null) {
				const { Preference, createdAt } = user;

				const { experience, personality, name, theme, img, links } = Preference;

				return {
					status: 200,
					email,
					token,
					preference: {
						experience,
						personality,
						name,
						theme,
						img,
						createdAt,
						links,
					},
					msg: '✅ Successful signUp',
				};
				// rest of the code that uses the destructured properties
			} else {
				// handle the case when user.Preference is null
			}
		} catch (err) {
			console.log((err as Error).message);
			return {
				status: 400,
				msg: (err as Error).message,
			};
		}
	});
