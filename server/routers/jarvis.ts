import { t } from '../trpc';
import { z } from 'zod';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import { prisma } from '../db';
import { create } from 'domain';
dotenv.config();

interface ResponseType {
	status: number;
	msg: string;
	data?: string; // Make data property optional
}

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const jarvisRouter = t.router({
	coverLetter: t.procedure
		.input(
			z.object({
				experience: z.string(),
				jobDescription: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const { experience, jobDescription } = input;

			try {
				// validation
				if (!experience || !jobDescription) {
					throw Error('😳 Please enter all fields 😭');
				}

				const jarvisPrompt =
					`Using the past job experience of when ${experience}.Can you help me write a breif, professional, conversational and friendly cover letter for the job posting below?
          ${jobDescription}`.replace(/\s+$/, '');

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
					// const createEntry = await prisma.qAndA.create({
					// 	data: { question, answer },
					// });
					// console.log(createEntry);
					console.log(cover1);
					const prompt2 = `${jarvisPrompt}
          ${cover1}
          
          Please keep going.`.replace(/\s+$/, '');

					const response2 = await openai.createCompletion({
						model: 'text-davinci-003',
						prompt: prompt2,
						temperature: 0.9,
						max_tokens: 150,
						top_p: 1,
						frequency_penalty: 0,
						presence_penalty: 0.6,
						stop: [' Human:', ' AI:'],
					});

					console.log(response2);
					if (response2.data.choices[0].text) {
						const cover2 = response2.data.choices[0].text.trim();
						return {
							status: 200,
							msg: '✅ Successful converted response',
							data: `${cover1} ${cover2}`,
						};
					}
				} else {
					throw Error('😳 There was an no new text to sent to prisma');
				}
			} catch (err) {
				console.log((err as Error).message);
				return {
					status: 400,
					msg: (err as Error).message,
				};
			}
		}),
	questionAnswer: t.procedure
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
					throw Error('😳 Please enter all fields 😭');
				}

				const jarvisPrompt =
					`Can you help me answer the following question in a short professional, conversational and friendly way? ${question}
        
        Please use the past job experience of when ${experience}.
        
        Also, please user this job posting information aswell.
        ${jobDescription}
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
					const createEntry = await prisma.qAndA.create({
						data: { question, answer },
					});
					console.log(createEntry);
					return {
						status: 200,
						msg: '✅ Successful converted response',
						data: answer,
					};
				} else {
					throw Error('😳 There was an new text to sent to prisma');
				}
			} catch (err) {
				console.log((err as Error).message);
				return {
					status: 400,
					msg: (err as Error).message,
				};
			}
		}),
	makeFancy: t.procedure
		.input(z.object({ text: z.string() }))
		.mutation(async ({ input }) => {
			const { text } = input;

			try {
				// validation
				if (!text) {
					throw Error('😳 There was no text sent to the back 😭');
				}

				const jarvisRequest = `Can you help me sound more professional and conversational? I'd like help converting the phrase "${text}"`;
				console.log(jarvisRequest);
				const response = await openai.createCompletion({
					model: 'text-davinci-003',
					prompt: jarvisRequest,
					temperature: 0.9,
					max_tokens: 150,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0.6,
					stop: [' Human:', ' AI:'],
				});

				if (response.data.choices[0].text) {
					const createEntry = await prisma.nsfw.create({
						data: {
							msg: jarvisRequest,
							response: response.data.choices[0].text,
						},
					});
				} else {
					throw Error('😳 There was an new text to sent to prisma');
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
		}),
});