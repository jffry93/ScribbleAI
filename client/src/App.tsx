import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import GlobalStyle from './GlobalStyles';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';
import NSFW from './pages/NSFW';
import FAQ from './pages/FAQ';
import CoverLetter from './pages/CoverLetter';
import Profile from './pages/Profile';
import { useState } from 'react';
import GetUser from './components/GetUser';
import Gratitude from './pages/Gratitude';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Grammar from './pages/Grammar';
import LoadingModal from './components/LoadingModal';
import Thesaurus from './pages/Thesaurus';

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
					<Route path='/' element={<Home />} />
					<Route
						path='/login'
						element={<Login email={email} setEmail={setEmail} />}
					/>
					<Route
						path='/signup'
						element={<SignUp email={email} setEmail={setEmail} />}
					/>
					<Route path='*' element={<p>404 error</p>} />
					{user && (
						<>
							<Route path='/nsfw' element={<NSFW />} />
							<Route
								path='/faq'
								element={
									user.preference ? (
										<FAQ
											jobDescription={jobDescription}
											setJobDescription={setJobDescription}
										/>
									) : (
										<LoadingModal />
									)
								}
							/>
							<Route
								path='/coverletter'
								element={
									user.preference ? (
										<CoverLetter
											jobDescription={jobDescription}
											setJobDescription={setJobDescription}
										/>
									) : (
										<LoadingModal />
									)
								}
							/>
							<Route
								path='/gratitude'
								element={
									user.preference ? (
										<Gratitude
											jobDescription={jobDescription}
											setJobDescription={setJobDescription}
										/>
									) : (
										<LoadingModal />
									)
								}
							/>
							<Route
								path='/grammar'
								element={user.preference ? <Grammar /> : <LoadingModal />}
							/>
							<Route
								path='/thesaurus'
								element={user.preference ? <Thesaurus /> : <LoadingModal />}
							/>
							<Route
								path='/profile'
								element={user.preference ? <Profile /> : <LoadingModal />}
							/>
						</>
					)}
				</Routes>
			</Layout>
		</>
	);
}

export default App;
