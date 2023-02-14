import styled from 'styled-components';
import { useAsyncMutate } from '../trpc/example/useAsyncMutate';
import { useAsyncQuery } from '../trpc/example/useAsyncQuery';
import { trpc } from '../trpc/trpc';
import React, { useContext, useState } from 'react';
import Form from '../components/Form';
import { ThemeContext } from '../context/TestContext';
import { StyledFlexCenter } from '../GlobalStyles';
import DescriptionModal from './DescriptionModal';

const Example = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [filterType, setFilterType] = useState('sync');
	const [details, setDetails] = useState<null | JSX.Element>(null);
	const [display, setDisplay] = useState(false);
	const [formData, setFormData] = useState<{
		email: string;
		name: string;
	}>({ email, name });

	const handleQuery = trpc.queryExample.useQuery({ name: formData.name });
	const handleMutate = trpc.mutateExample.useMutation();
	const handleSecret = trpc.secretData.useQuery();

	const handleAsyncMutate = useAsyncMutate(formData.email);
	const handleAsyncQuery = useAsyncQuery(formData.email);

	const buttonArray = [
		{
			title: 'Query Server',
			filter: 'sync',
			handleEvent: () => {
				console.log(handleQuery.data);
			},
			description: () => {
				return (
					<>
						<p>
							This will send a name to the backend and respond with a greeting
							in the frontend
						</p>
						<h2>Requirements</h2>
						<ul>
							<li>Must include a name</li>
						</ul>
					</>
				);
			},
		},
		{
			title: 'Mutate Server',

			filter: 'sync',
			handleEvent: async () => {
				const data = await handleMutate.mutate('something');
				console.log(data); //must use mutateAsync if returning something
			},
			description: () => {
				return (
					<>
						<p>
							Send a string to the backend but will NOT return a response. In
							order to receive a response in the frontend you need mutateAsync()
						</p>
						<h2>Requirements</h2>
						<ul>
							<li>String must be passed</li>
						</ul>
					</>
				);
			},
		},
		{
			title: 'Query Database',
			filter: 'async',
			handleEvent: handleAsyncQuery,
			description: () => {
				return (
					<>
						<p>
							This will GET user info from the postgres database that matches
							the specified email.
						</p>
						<h2>Requirements</h2>
						<ul>
							<li>Must include email</li>
						</ul>
					</>
				);
			},
		},
		{
			title: 'Mutate Database',
			filter: 'async',
			handleEvent: handleAsyncMutate,
			description: () => {
				return (
					<>
						<p>
							POST request that will create user info in the postgres database
							matching the specified email.
						</p>
						<h2>Requirements</h2>
						<ul>
							<li>Must include email</li>
						</ul>
					</>
				);
			},
		},
		{
			title: 'Secret',
			filter: 'secret',
			handleEvent: () => {
				console.log(handleSecret.data);
			},
			description: () => {
				return (
					<>
						<p>
							Uses adminProcedure and checks context to see if the user is an
							admin. If admin is true then get message
						</p>
						<h2>Requirements</h2>
						<ul>
							<li>Must include email</li>
						</ul>
					</>
				);
			},
		},
	];

	const filteredButtons = buttonArray.filter(
		(item) => item.filter === filterType
	);

	const filterOptions = ['sync', 'async', 'secret'];
	return (
		<StyledMain>
			<StyledDetails>
				<h1>Current Values</h1>
				<div className='content'>
					<h4>NAME:</h4>
					<span>{formData.name}</span>
				</div>
				<div className='content'>
					<h4>EMAIL:</h4>
					<span>{formData.email}</span>
				</div>
			</StyledDetails>
			<StyledForm
				onSubmit={(e) => {
					e.preventDefault();
					setFormData({ email, name });
				}}
			>
				<input
					placeholder='Enter Your Name'
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					placeholder='Email Address'
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<button type={'submit'}>Set Values</button>
			</StyledForm>
			<StyledSwitch>
				<h2>Select Endpoints</h2>
				<div className='button-container'>
					{filterOptions.map((item) => {
						return (
							<button
								className={item === filterType ? 'active' : ''}
								key={item}
								onClick={() => setFilterType(() => item)}
							>
								{item.toUpperCase()}
							</button>
						);
					})}
				</div>
			</StyledSwitch>

			{filteredButtons.map((data, index) => {
				const { title, handleEvent, description } = data;
				return (
					<StyledButton key={title}>
						<button key={title} onClick={handleEvent}>
							{title}
						</button>
						<button
							className='icon'
							onClick={() => {
								setDetails(description());
								setDisplay(true);
							}}
						>
							i
						</button>
					</StyledButton>
				);
			})}
			<p className='read-the-docs'>
				Click on the <span>i</span> for description and requirements
			</p>
			{details && display && (
				<DescriptionModal details={details} setDisplay={setDisplay} />
			)}
		</StyledMain>
	);
};

export default Example;

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5em;
	padding: 2em;
	margin: auto;
	max-width: 500px;
	.read-the-docs {
		padding: var(--lg-padding) 0;
		min-height: 100px;
		color: #888;
		span {
			color: var(--primary);
		}
	}
`;
const StyledDetails = styled(StyledFlexCenter)`
	padding: var(--md-padding) 0;
	flex-direction: column;
	gap: var(--md-padding);
	h1 {
		text-align: center;
	}
	width: 100%;
	.content {
		width: 100%;
		display: flex;
		gap: 8px;
		span {
			/* border-bottom: 1.2px solid #888; */
			width: 100%;
		}
	}
`;
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 8px;
	/* border: 1px solid red; */
	width: 100%;
	input {
		padding: var(--sm-padding);
	}
	button {
		background-color: var(--primary);
	}
`;

const StyledSwitch = styled(StyledFlexCenter)`
	padding: var(--md-padding);
	flex-direction: column;
	gap: var(--md-padding);
	width: 100%;
	.button-container {
		display: flex;
		width: 100%;
		border-radius: 4px;
		overflow: hidden;
		button {
			border-radius: 0%;
			flex: 1;
			&.active {
				border-radius: 0%;
				background-color: var(--primary);
			}
		}
	}
`;

const StyledButton = styled.div`
	background-color: #1a1a1a;
	display: flex;
	width: 100%;
	border-radius: 4px;
	overflow: hidden;
	button {
		border-radius: 0;
		padding-left: 50px;
	}
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;

		padding: 0;
		height: 39.69px;
		width: 39.69px;
	}
`;
