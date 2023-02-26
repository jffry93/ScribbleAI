import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layout';
import GlobalStyle from './GlobalStyles';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import Landing from './pages/Landing';
import NSFW from './pages/NSFW';
import FAQ from './pages/FAQ';
import CoverLetter from './pages/CoverLetter';
import Profile from './pages/Profile';
import { useState } from 'react';
import GetUser from './components/GetUser';

export interface JobDescriptionType {
	jobDescription: string;
	setJobDescription: (value: string) => void;
}

export interface EmailType {
	email: string;
	setEmail: (value: string) => void;
}

function App() {
	const {
		state: { user },
	} = useAuthContext();

	const [jobDescription, setJobDescription] = useState('');
	const [email, setEmail] = useState('');

	return (
		<>
			{user && <GetUser />}
			<GlobalStyle />
			<Layout>
				<Routes>
					<Route path='/' element={user ? <Home /> : <Landing />} />
					<Route
						path='/login'
						element={<Login email={email} setEmail={setEmail} />}
					/>
					<Route
						path='/signup'
						element={<Signup email={email} setEmail={setEmail} />}
					/>
					<Route path='*' element={<p>404 error</p>} />
					{user && (
						<>
							<Route path='/nsfw' element={<NSFW />} />
							<Route
								path='/faq'
								element={
									user.preference && (
										<FAQ
											jobDescription={jobDescription}
											setJobDescription={setJobDescription}
										/>
									)
								}
							/>
							<Route
								path='/coverletter'
								element={
									user.preference && (
										<CoverLetter
											jobDescription={jobDescription}
											setJobDescription={setJobDescription}
										/>
									)
								}
							/>
							<Route path='/profile' element={user.preference && <Profile />} />
						</>
					)}
				</Routes>
			</Layout>
		</>
	);
}

export default App;
