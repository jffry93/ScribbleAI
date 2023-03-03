import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { openai } from '../../openAI';
import { prisma } from '../../db';

export const thesaurusRex = secretUserProcedure
	.input(z.object({ text: z.string(), category: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { text, category } = input;
		try {
			// validation
			if (!text || !category) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				throw Error('😳 Please enter something to convert 😭');
			}
			const promptObject = {
				model: 'text-davinci-003',
				prompt: `Please provide a short ${category} list of other ways to say : ${text.trim()}`,
				temperature: 0,
				max_tokens: 60,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			};
			const response = await openai.createCompletion(promptObject);
			if (response.data.choices[0].text) {
				// send to Database
				// await prisma.nSFW.create({
				// 	data: {
				// 		userId: ctx.user.id,
				// 		prompt: `Correct this to standard English:\n\n${text}`,
				// 		response: response.data.choices[0].text,
				// 	},
				// });
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
