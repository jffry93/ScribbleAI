import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import GlobalStyle from './GlobalStyles';
import { useAuthContext } from './hooks/useAuthContext';
import GetUser from './components/GetUser';
import { useRouteData } from './hooks/useRouteData';
import { useUserRouteData } from './hooks/useUserRouteData';

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
	const routeData = useRouteData();
	const userRouteData = useUserRouteData();

	return (
		<>
			{user && <GetUser />}
			<GlobalStyle />
			<Layout>
				<Routes>
					{routeData.map((route, index) => (
						<Route path={route.path} element={route.element()} key={index} />
					))}
					{user &&
						userRouteData.map((route, index) => (
							<Route path={route.path} element={route.element()} key={index} />
						))}
				</Routes>
			</Layout>
		</>
	);
}

export default App;
