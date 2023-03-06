import { z } from 'zod';
import { prisma } from '../../db';
import { MyContext } from '../users';
import { legitCheckProcedure } from '../../middleware/legitCheckMiddleware';

export const updateUser = legitCheckProcedure
	.input(
		z.object({
			name: z.string(),
			experience: z.string(),
			personality: z.string(),
			github: z.string(),
			linkedin: z.string(),
			additional: z.string(),
		})
	)
	.mutation(
		async ({
			ctx,
			input,
		}: {
			ctx: MyContext;
			input: {
				name: string;
				experience: string;
				personality: string;
				github: string;
				linkedin: string;
				additional: string;
			};
		}) => {
			try {
				const { name, experience, personality, github, linkedin, additional } =
					input;
				const { user } = ctx;
				if (!name && !experience && !personality) {
					throw Error('😳 All fields must be filled 😭');
				}
				type Links = Record<string, string>;
				const links: Links = { github, linkedin, additional };

				//remove any empty links
				Object.keys(links).forEach((key: string) => {
					if (links[key].trim() === '') {
						delete links[key];
					}
				});
				// update user info
				await prisma.preference.update({
					where: { userId: user?.id },
					data: { name, experience, personality, links },
				});
				return {
					status: 200,
					preference: {
						experience,
						personality,
						name,
						links,
					},
					msg: '✅ Successful signUp',
				};
			} catch (err) {
				console.log((err as Error).message);
				return {
					status: 500,
					msg: (err as Error).message,
				};
			}
		}
	);
