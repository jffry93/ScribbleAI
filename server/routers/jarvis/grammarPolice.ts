import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { openai } from '../../libs/openAI';
import { prisma } from '../../prisma/db';
import { handleModel } from '../../libs/openAI/handleModel';

export const grammarPolice = secretUserProcedure
	.input(z.object({ text: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { text } = input;
		try {
			// validation
			if (!text) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				throw Error('😳 Please enter something to convert 😭');
			}
			const prompt: string = `Correct this to standard English:\n\n${text}`;

			const response = await handleModel(prompt, 60);
			if (response.data.choices[0].text) {
				// send to Database
				await prisma.grammar.create({
					data: {
						prompt,
						userId: ctx.user.id,
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
