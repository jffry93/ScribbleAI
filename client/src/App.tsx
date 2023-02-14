import Example from './pages/Example';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layout';
import GlobalStyle, { StyledFlexCenter } from './GlobalStyles';
import styled from 'styled-components';

function App() {
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
