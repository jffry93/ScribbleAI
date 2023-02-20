import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FetchProvider from './trpc/FetchProvider';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<ThemeProvider>
		<AuthContextProvider>
			<FetchProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</FetchProvider>
		</AuthContextProvider>
	</ThemeProvider>
	// </React.StrictMode>
);
