import { useState } from 'react';

export const dropDownOptions = ['Professional', 'Exciting', 'Funny'];
export const useCategoryDropdown = () => {
	const [selectedOption, setSelectedOption] = useState('');

	return { selectedOption, setSelectedOption };
};
