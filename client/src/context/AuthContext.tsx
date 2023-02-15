import React, { useEffect, useReducer } from 'react';

interface AuthProvProps {
	children: React.ReactNode;
}

interface User {
	email: string;
	msg: string;
	token: string;
}
interface ReducerState {
	user: User | null;
}

interface ReducerAction {
	type: string;
	payload: any;
}

const initialValue = {
	user: null,
};

export const AuthContext = React.createContext<{
	state: ReducerState;
	dispatch: React.Dispatch<ReducerAction>;
}>({
	state: { user: null },
	dispatch: () => {},
});

export const authReducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case 'LOGIN':
			return { user: action.payload };
		case 'LOGOUT':
			return { user: null };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }: AuthProvProps) => {
	const [state, dispatch] = useReducer(authReducer, initialValue);

	useEffect(() => {
		// update context if localStorage has user key
		const userData = localStorage.getItem('user');
		const user = userData ? JSON.parse(userData) : null;
		if (user) {
			dispatch({ type: 'LOGIN', payload: user });
		}
	}, []);
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
