import { z } from 'zod';
import { secretUserProcedure } from '../../middleware/secretUserMiddleware';
import { openai } from '../../openAI';
import { prisma } from '../../db';

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
			const promptObject = {
				model: 'text-davinci-003',
				prompt: `Correct this to standard English:\n\n${text}`,
				temperature: 0,
				max_tokens: 60,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			};
			// const jarvisRequest = `Can you help me sound more professional and conversational?  ${
			// 	ctx.user.Preference?.personality &&
			// 	'Let me tell you a bit about my self so you can personalize the response. ' +
			// 		ctx.user.Preference.personality
			// } I'd like help converting the phrase "${text}"`;
			// convert it AI
			const response = await openai.createCompletion(promptObject);
			if (response.data.choices[0].text) {
				// send to Database
				console.log(response.data.choices[0].text);
				console.log('send response to prisma');
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
