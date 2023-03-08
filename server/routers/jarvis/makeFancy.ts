import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { prisma } from '../../prisma/db';
import { handleModel } from '../../libs/openAI/handleModel';

export const makeFancy = secretUserProcedure
	.input(z.object({ text: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { text } = input;
		try {
			// validation
			if (!text) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				throw Error('😳 Please enter something to convert 😭');
			}
			const prompt = `Can you help me sound more professional and conversational? I'd like help converting the phrase "${text}"`;
			// convert it AI
			const response = await handleModel(prompt);
			if (response.data.choices[0].text) {
				// send to Database
				await prisma.nSFW.create({
					data: {
						userId: ctx.user.id,
						prompt,
						response: response.data.choices[0].text,
					},
				});
			} else {
				throw Error('😳 Unable to get response from AI Helper');
			}
			return {
				status: 200,
				msg: '✅ Successful converted response',
				data: response.data.choices[0].text,
			};
		} catch (err) {
			console.log((err as Error).message);
			return {
				status: 400,
				msg: (err as Error).message,
			};
		}
	});
