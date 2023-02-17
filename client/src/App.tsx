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

function App() {
	const {
		state: { user },
	} = useAuthContext();

	return (
		<>
			<GlobalStyle />
			<Layout>
				<Routes>
					<Route path='/' element={user ? <Home /> : <Landing />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='*' element={<p>404 error</p>} />
					{user && (
						<>
							<Route path='/faq' element={<FAQ />} />
							<Route path='/nsfw' element={<NSFW />} />
							<Route path='/coverletter' element={<CoverLetter />} />
							<Route path='/profile' element={<Profile />} />
						</>
					)}
				</Routes>
			</Layout>
		</>
	);
}

export default App;
