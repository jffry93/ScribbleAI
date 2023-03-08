import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { openai } from '../../libs/openAI';
import { prisma } from '../../prisma/db';
import { delayAsync } from '../../utils/delayAsync';
import { handleModel } from '../../libs/openAI/handleModel';

export const showAppreciation = secretUserProcedure
	.input(
		z.object({
			name: z.string(),
			interviewer: z.string(),
			perspective: z.string(),
			jobDescription: z.string(),
		})
	)
	.mutation(async ({ input, ctx }) => {
		const { name, interviewer, perspective, jobDescription } = input;
		try {
			// validation
			if (!name || !jobDescription || !interviewer || !perspective) {
				await delayAsync();
				throw Error('😳 Please enter all fields 😭');
			}

			const prompt =
				`My name is ${name}, and i just had an interview with ${interviewer}. Can you help me write a brief, professional, conversational and friendly thank you letter for the job posting below?${
					typeof ctx.user.Preference?.personality === 'string' &&
					'Let me tell you a bit about my self so you can personalize the response. ' +
						ctx.user.Preference.personality
				} ${jobDescription.replace(/\s+$/, '')}`.replace(/\s+$/, '');

			const response1 = await handleModel(prompt);

			if (response1.data.choices[0].text) {
				const draftLetter = response1.data.choices[0].text.trim();

				const prompt2 = `${prompt}
          ${draftLetter}

          Please rewrite the thank you letter and include my perspective from the interview I had. ${perspective}`;

				const response2 = await handleModel(prompt2);

				if (response2.data.choices[0].text) {
					const finalLetter = response2.data.choices[0].text.trim();
					//add to database
					await prisma.gratitude.create({
						data: {
							userId: ctx.user.id,
							prompt: prompt2,
							response: finalLetter,
						},
					});
					return {
						status: 200,
						msg: '✅ Successful converted response',
						data: `${finalLetter}`,
					};
				} else {
					throw Error('😳 Unable to get response from AI Helper Round 2');
				}
			} else {
				throw Error('😳 Unable to get response from AI Helper Round 1');
			}
		} catch (err) {
			console.log((err as Error).message);
			return {
				status: 400,
				msg: (err as Error).message,
			};
		}
	});
