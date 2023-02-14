import { createContext, ReactNode } from 'react';
import { useState } from 'react';

interface ThemeContextType {
	theme: string;
	setTheme: (value: string) => void;
}
interface User {
	name?: string;
	email?: string;
	[key: string]: any;
}

export const ThemeContext = createContext<null | (ThemeContextType & User)>(
	null
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [formData, setFormData] = useState<null | User>(null);
	const [theme, setTheme] = useState('light');

	return (
		<ThemeContext.Provider value={{ theme, setTheme, formData, setFormData }}>
			{children}
		</ThemeContext.Provider>
	);
};
