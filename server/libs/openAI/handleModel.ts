import { openai } from '.';

export const handleModel = async (prompt: string, token: number = 150) => {
	const modelObj = {
		model: 'text-davinci-003',
		prompt: prompt,
		temperature: 0.9,
		max_tokens: token,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0.6,
		stop: [' Human:', ' AI:'],
	};
	return await openai.createCompletion(modelObj);
};
