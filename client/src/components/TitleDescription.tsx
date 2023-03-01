import React from 'react';

interface TDProps {
	title: string;
	description: string;
}

const TitleDescription = ({ title, description }: TDProps) => {
	return (
		<>
			<h1>{title}</h1>
			<p className='description'>{description}</p>
		</>
	);
};

export default TitleDescription;
