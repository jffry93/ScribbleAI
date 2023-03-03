import React from 'react';

export interface Option {
	value: string;
	label: string;
}

interface DropdownProps {
	options: Option[];
	selectedOption?: Option;
	setSelectedOption: (value: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
	options,
	selectedOption,
	setSelectedOption,
}) => {
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		const selected = options.find((option) => option.value === value);
		if (selected) {
			setSelectedOption(selected);
		}
	};

	return (
		<select value={selectedOption?.value} onChange={handleSelectChange}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default Dropdown;
