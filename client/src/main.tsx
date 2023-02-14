import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FetchProvider from './trpc/FetchProvider';
import './index.css';
import { ThemeProvider } from './context/TestContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<FetchProvider>
		<ThemeProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</FetchProvider>
	// </React.StrictMode>
);
