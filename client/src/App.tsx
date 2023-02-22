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
import { useEffect, useState } from 'react';
import { trpc } from './trpc/trpc';
import GetUser from './components/GetUser';

function App() {
	const {
		state: { user },
	} = useAuthContext();

	interface jobDescriptionType {
		jobDescription: string;
		setJobDescription: (value: string) => void;
	}
	const [jobDescription, setJobDescription] = useState('');

	return (
		<>
			{user && <GetUser />}
			<GlobalStyle />
			<Layout>
				<Routes>
					<Route path='/' element={user ? <Home /> : <Landing />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='*' element={<p>404 error</p>} />
					{user && (
						<>
							<Route path='/nsfw' element={<NSFW />} />
							{user.preference && (
								<>
									<Route
										path='/faq'
										element={
											<FAQ
												jobDescription={jobDescription}
												setJobDescription={setJobDescription}
											/>
										}
									/>
									<Route
										path='/coverletter'
										element={
											<CoverLetter
												jobDescription={jobDescription}
												setJobDescription={setJobDescription}
											/>
										}
									/>
									<Route path='/profile' element={<Profile />} />
								</>
							)}
						</>
					)}
				</Routes>
			</Layout>
		</>
	);
}

export default App;
