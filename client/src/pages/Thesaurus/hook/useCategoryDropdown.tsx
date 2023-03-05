import { useState } from 'react';
import { Option } from '../../../components/Dropdown';

export const dropDownOptions = [
	{ value: 'Professional', label: 'Professional' },
	{ value: 'Exciting', label: 'Exciting' },
	{ value: 'Funny', label: 'Funny' },
];
export const useCategoryDropdown = () => {
	const [selectedOption, setSelectedOption] = useState<Option>(
		dropDownOptions[0]
	);

	return { selectedOption, setSelectedOption };
};
