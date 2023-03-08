import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { prisma } from '../../prisma/db';
import { handleModel } from '../../libs/openAI/handleModel';

export const coverLetter = secretUserProcedure
	.input(
		z.object({
			experience: z.string(),
			jobDescription: z.string(),
		})
	)
	.mutation(async ({ input, ctx }) => {
		const { experience, jobDescription } = input;
		try {
			// validation
			if (!experience || !jobDescription) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				throw Error('😳 Please enter all fields 😭');
			}

			const jarvisPrompt =
				`Using the past job experience of when ${experience}. Can you help me write a brief, professional, conversational and friendly cover letter for the job posting below? ${
					ctx.user.Preference?.personality &&
					'Let me tell you a bit about my self so you can personalize the response. ' +
						ctx.user.Preference.personality
				} ${jobDescription.replace(/\s+$/, '')}`.replace(/\s+$/, '');

			const response1 = await handleModel(jarvisPrompt);

			if (response1.data.choices[0].text) {
				const cover1 = response1.data.choices[0].text.trim();

				const prompt2 = `${jarvisPrompt}
          ${cover1}
          Please keep going.`.replace(/\s+$/, '');

				const response2 = await handleModel(prompt2);

				if (response2.data.choices[0].text) {
					const cover2 = response2.data.choices[0].text.trim();
					//add to database
					console.log(`${cover1} ${cover2}`);
					await prisma.coverLetter.create({
						data: {
							userId: ctx.user.id,
							prompt: prompt2,
							response: `${cover1} ${cover2}`,
						},
					});
					return {
						status: 200,
						msg: '✅ Successful converted response',
						data: `${cover1} ${cover2}`,
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
