import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { prisma } from '../../prisma/db';
import { handleModel } from '../../libs/openAI/handleModel';

export const thesaurusRex = secretUserProcedure
	.input(z.object({ text: z.string(), category: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { text, category } = input;
		try {
			// validation
			console.log(category.length);
			if (category.length < 1) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				throw Error('😳 Please select a category 😭');
			}
			if (!text || !category) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				throw Error('😳 Please enter something to convert 😭');
			}

			const prompt = `Please provide a short ${category} list of other ways to say : ${text.trim()}`;
			const response = await handleModel(prompt);

			if (response.data.choices[0].text) {
				// send to Database
				await prisma.thesaurus.create({
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
				data: response.data.choices[0].text.trim(),
			};
		} catch (err) {
			console.log((err as Error).message);
			return {
				status: 400,
				msg: (err as Error).message,
			};
		}
	});
