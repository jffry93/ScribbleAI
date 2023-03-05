import styled from 'styled-components';

export interface TitleDescProps {
	title: string;
	description: string;
}

const TitleDescription = ({ title, description }: TitleDescProps) => {
	return (
		<>
			<h1>{title}</h1>
			<StyledP>{description}</StyledP>
		</>
	);
};

export default TitleDescription;

const StyledP = styled.p`
	color: var(--secondary-text-color);
`;
