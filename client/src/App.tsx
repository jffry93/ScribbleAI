import { useEffect, useState } from 'react';

import reactLogo from './assets/react.svg';
import './App.css';
import { trpc } from './trpc/trpc';
type SignUpInput = {
	userId: string;
};
function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('');
	const [toggle, setToggle] = useState(true);
	const test = trpc.user.signUp.useMutation();
	const onAdd = () => {
		test.mutate({ userId: '123' });
	};

	useEffect(() => {
		if (name.length > 0) {
			onAdd();
		}
	}, [toggle]);

	return (
		<div className='App'>
			<div>
				<a href='https://vitejs.dev' target='_blank'>
					<img src='/vite.svg' className='logo' alt='Vite logo' />
				</a>
				<a href='https://reactjs.org' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<button onClick={() => setToggle((prev) => !prev)}>
					current {toggle ? 'true' : 'false'}
				</button>
				<button onClick={() => setName(() => 'Jeffrey')}>Name is{name}</button>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</div>
	);
}

export default App;
