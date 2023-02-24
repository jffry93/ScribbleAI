import { t } from '../../trpc';
import { z } from 'zod';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { prisma } from '../../db';
import { createToken } from '../users';

export const signUp = t.procedure
	.input(z.object({ email: z.string(), password: z.string() }))
	.mutation(async ({ input }) => {
		const { email, password } = input;
		try {
			// validation
			if (!email || !password) {
				throw Error('😳 All fields must be filled 😭');
			}
			if (!validator.isEmail(email)) {
				throw Error('😳 Email not valid 😭');
			}
			if (!validator.isStrongPassword(password)) {
				throw Error(
					'😳 Password must include at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long 😭'
				);
			}
			// check database
			const legitCheck = await prisma.user.findFirst({ where: { email } });
			if (legitCheck) {
				throw Error('❌ Email is already in use 😑');
			}
			// hash password
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			const user = await prisma.user.create({
				data: {
					email,
					password: hash,
					Preference: { create: { links: {} } },
				},
				include: { Preference: true },
			});
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
