import reactLogo from './assets/react.svg';
import prismaLogo from './assets/prisma.svg';
import typescriptLogo from './assets/typescript.svg';
import './App.css';
import styled from 'styled-components';
import { useAsyncMutate } from './trpc/example/useAsyncMutate';
import { useAsyncQuery } from './trpc/example/useAsyncQuery';
import { trpc } from './trpc/trpc';
import React, { useState } from 'react';

function App() {
	const [currentIndex, setCurrentIndex] = useState<null | number>(null);
	const email = 'JeffreyZalischi';
	const name = 'Jeffrey 🎉';
	const handleQuery = trpc.queryExample.useQuery({ name });
	const handleMutate = trpc.mutateExample.useMutation();
	const handleSecret = trpc.secretData.useQuery();
	const handleAsyncMutate = useAsyncMutate(email);
	const handleAsyncQuery = useAsyncQuery(email);

	const buttonArray = [
		{
			title: 'Query',
			handleEvent: () => {
				console.log(handleQuery.data);
			},
			description:
				'This will send a name to the backend and respond with a greeting in the frontend',
		},
		{
			title: 'Mutate',
			handleEvent: async () => {
				const data = await handleMutate.mutate('something');
				console.log(data); //must use mutateAsync if returning something
			},
			description:
				'Send a string to the backend but will NOT return a response. In order to receive a response in the frontend you need mutateAsync() ',
		},
		{
			title: 'Async Query',
			handleEvent: handleAsyncQuery,
			description:
				'This will GET user info from the postgres database that matches the specified email.',
		},
		{
			title: 'Async Mutate',
			handleEvent: handleAsyncMutate,
			description:
				'POST request that will create user info in the postgres database matching the specified email.',
		},
		{
			title: 'Secret',
			handleEvent: () => {
				console.log(handleSecret.data);
			},
			description:
				'Uses adminProcedure and checks context to see if the user is an admin. If admin is true then get message',
		},
	];

	return (
		<div className='App'>
			<div>
				<a>
					<img src='/vite.svg' className='logo' alt='Vite logo' />
				</a>
				<a>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
				<a>
					<img
						src={typescriptLogo}
						className='logo typescript'
						alt='React logo'
					/>
				</a>
			</div>
			<h1>Examples</h1>
			<StyledMain className='card'>
				{buttonArray.map((data, index) => {
					const { title, handleEvent, description } = data;
					return (
						<React.Fragment key={title}>
							{currentIndex === index && <p>{description}</p>}
							<button
								key={title}
								onClick={handleEvent}
								onMouseOver={() => setCurrentIndex(index)}
							>
								{title}
							</button>
						</React.Fragment>
					);
				})}
			</StyledMain>
			<p className='read-the-docs'>Hover over button for description</p>
		</div>
	);
}

export default App;

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
`;
