import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAuthContext } from '../hooks/useAuthContext';

const ThemeData = {
	primary: '#545AA7',
	secondary: '#7B68EE',
	textColor: '#aaa',
};

export const ThemeContext = ({ children }: { children: React.ReactNode }) => {
	const {
		state: { user },
	} = useAuthContext();

	const theme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: ThemeData.primary,
			},
			secondary: {
				main: ThemeData.secondary,
			},
			background: {
				default: '#FFFFFF',
				paper: '#F2F2F2',
			},
			text: {
				primary: ThemeData.textColor,
			},
		},
		typography: { body2: { fontSize: '14px' } },
		components: {
			MuiTextField: {
				defaultProps: {
					fullWidth: true,
					variant: 'filled',
					sx: { '& .MuiFilledInput-root': { padding: '8px' }, p: 0 },
				},
			},
			MuiSelect: {
				defaultProps: {
					fullWidth: true,
					variant: 'filled',
					sx: { '& .MuiFilledInput-root': { padding: '8px' } },
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						backgroundColor: ThemeData.primary,
						color: ThemeData.textColor,
						// boxShadow: '0 0 10px #719ECE',
						border: '1px solid transparent',
						'&:hover': {
							border: '1px solid ' + ThemeData.secondary,
							backgroundColor: ThemeData.secondary,
							boxShadow: '0 0 10px ' + ThemeData.secondary,
						},
					},
				},
			},
			// MuiLink: {
			// 	styleOverrides: {
			// 		root: {
			// 			color: 'blue',
			// 			textDecoration: 'underline',
			// 			'&:hover': {
			// 				color: 'red',
			// 			},
			// 		},
			// 	},
			// },
			MuiIconButton: {
				styleOverrides: {
					root: {
						p: 1.25,
						backgroundColor: ThemeData.primary,
						color: '#ddd',
						border: '1px solid transparent',
						'&:hover': {
							border: '1px solid ' + ThemeData.secondary,
							backgroundColor: ThemeData.secondary,
							boxShadow: '0 0 10px ' + ThemeData.secondary,
						},
					},
				},
			},
		},
	});

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
