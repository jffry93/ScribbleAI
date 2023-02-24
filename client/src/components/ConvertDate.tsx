import { formatDistanceToNow } from 'date-fns';

const ConvertDate = ({ text }: { text: Date }) => {
	const date = new Date(text);
	const daysAgo = formatDistanceToNow(date);

	return <span>{daysAgo}</span>;
};

export default ConvertDate;
