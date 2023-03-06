import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FetchProvider from './trpc/FetchProvider';
import { ThemeContext } from './context/ThemeContext';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<ThemeContext>
		<AuthContextProvider>
			<FetchProvider>
				<HashRouter>
					<App />
				</HashRouter>
			</FetchProvider>
		</AuthContextProvider>
	</ThemeContext>
	// </React.StrictMode>
);
