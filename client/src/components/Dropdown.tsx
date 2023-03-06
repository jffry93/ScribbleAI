import {
	Box,
	FormControl,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface DropdownProps {
	options: string[];
	selectedOption?: string;
	setSelectedOption: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
	options,
	selectedOption,
	setSelectedOption,
}) => {
	const handleChange = async (event: SelectChangeEvent) => {
		console.log(event.target.value);
		setSelectedOption(event.target.value);
	};

	return (
		<StyledDiv>
			<FormControl fullWidth>
				<Select
					fullWidth
					value={selectedOption}
					onChange={handleChange}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem value=''>
						<em>Select a category</em>
					</MenuItem>
					{options.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</StyledDiv>
	);
};

export default Dropdown;

const StyledDiv = styled.div`
	.MuiSelect-select.MuiSelect-filled.MuiInputBase-input.MuiFilledInput-input.css-fs87sd-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input {
		padding: 12px 8px 8px;
	}
`;
