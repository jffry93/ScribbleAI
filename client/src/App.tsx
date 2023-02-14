import Example from './pages/Example';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layout';
import GlobalStyle, { StyledFlexCenter } from './GlobalStyles';
import styled from 'styled-components';
import useWebSocket from './trpc/useWebSocket';

function App() {
	useWebSocket();
	return (
		<>
			<GlobalStyle />
			<Layout>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/examples' element={<Example />} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
