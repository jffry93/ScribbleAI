import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { openai } from '../../openAI';
import { prisma } from '../../db';
import { delayAsync } from '../../delayAsync';

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

			const jarvisPrompt =
				`My name is ${name}, and i just had an interview with ${interviewer}. Can you help me write a brief, professional, conversational and friendly thank you letter for the job posting below?${
					typeof ctx.user.Preference?.personality === 'string' &&
					'Let me tell you a bit about my self so you can personalize the response. ' +
						ctx.user.Preference.personality
				} ${jobDescription.replace(/\s+$/, '')}`.replace(/\s+$/, '');

			const response1 = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: jarvisPrompt,
				temperature: 0.9,
				max_tokens: 150,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0.6,
				stop: [' Human:', ' AI:'],
			});

			if (response1.data.choices[0].text) {
				const cover1 = response1.data.choices[0].text.trim();

				const prompt2 = `${jarvisPrompt}
          ${cover1}

          Please rewrite the thank you letter and include my perspective from the interview I had. ${perspective}`;

				const response2 = await openai.createCompletion({
					model: 'text-davinci-003',
					prompt: prompt2,
					temperature: 0.9,
					max_tokens: 200,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0.6,
					stop: [' Human:', ' AI:'],
				});

				if (response2.data.choices[0].text) {
					const cover2 = response2.data.choices[0].text.trim();
					//add to database
					await prisma.gratitude.create({
						data: { userId: ctx.user.id, prompt: prompt2, response: cover2 },
					});
					return {
						status: 200,
						msg: '✅ Successful converted response',
						data: `${cover2}`,
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
