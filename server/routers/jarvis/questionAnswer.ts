import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { prisma } from '../../prisma/db';
import { handleModel } from '../../libs/openAI/handleModel';

export const questionAnswer = secretUserProcedure
	.input(
		z.object({
			question: z.string(),
			experience: z.string(),
			jobDescription: z.string(),
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { question, experience, jobDescription } = input;
		try {
			// validation;
			if (!question || !experience || !jobDescription) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				throw Error('😳 Please enter all fields 😭');
			}
			const prompt =
				`Can you help me answer the following question in a short professional, conversational and friendly way? ${question} Please use the past job experience of when ${experience} ${
					ctx.user.Preference?.personality &&
					'Let me tell you a bit about my self so you can personalize the response. ' +
						ctx.user.Preference.personality
				} Also, please user this job posting information aswell.${jobDescription.replace(
					/\s+$/,
					''
				)}
        `.replace(/\s+$/, '');

			const response = await handleModel(prompt);

			if (response.data.choices[0].text) {
				const answer = response.data.choices[0].text.trim();
				await prisma.answer.create({
					data: { question, answer, userId: ctx.user.id },
				});
				return {
					status: 200,
					msg: '✅ Successful converted response',
					data: answer,
				};
			} else {
				throw Error('😳 Unable to get response from AI Helper');
			}
		} catch (err) {
			console.log((err as Error).message);
			return {
				status: 400,
				msg: (err as Error).message,
			};
		}
	});
