import { Typography } from '@mui/material';
import { LabelProps } from './Form';

export interface TitleDescProps {
	title: string;
	description: string;
}

const TitleDescription = ({ title, description }: TitleDescProps) => {
	return (
		<>
			<Typography variant='h2'>{title}</Typography>
			<Typography variant='h6'>{description}</Typography>
		</>
	);
};

export default TitleDescription;
