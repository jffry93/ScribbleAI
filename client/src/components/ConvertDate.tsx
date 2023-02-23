import { formatDistanceToNow } from 'date-fns';

const ConvertDate = ({ text }: { text: Date }) => {
	console.log(typeof text);
	const date = new Date(text);
	const daysAgo = formatDistanceToNow(date);
	console.log(daysAgo);

	return <span>{daysAgo}</span>;
};

export default ConvertDate;
