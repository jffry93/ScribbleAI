import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { openai } from '../../openAI';
import { prisma } from '../../db';

export const questionAnswer = secretUserProcedure
	.input(
		z.object({
			question: z.string(),
			experience: z.string(),
			jobDescription: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		const { question, experience, jobDescription } = input;
		try {
			// validation
			if (!question || !experience || !jobDescription) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				throw Error('😳 Please enter all fields 😭');
			}
			const jarvisPrompt =
				`Can you help me answer the following question in a short professional, conversational and friendly way? ${question} Please use the past job experience of when ${experience}. Also, please user this job posting information aswell.${jobDescription}
        `.replace(/\s+$/, '');

			const response = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: jarvisPrompt,
				temperature: 0.9,
				max_tokens: 150,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0.6,
				stop: [' Human:', ' AI:'],
			});

			if (response.data.choices[0].text) {
				const answer = response.data.choices[0].text.trim();
				const createEntry = await prisma.answer.create({
					data: { question, answer },
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
