export const copyClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
	setTimeout(() => {
		console.log('clg in timeout');
		// clipboard.children[0].style.display = ' none';
	}, 2000);
};
