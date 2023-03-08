export const delayAsync = async (delay: number = 1000) => {
	await new Promise((resolve) => setTimeout(resolve, delay));
};
