import { t } from '../../trpc';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { signUp } from './../users/signUp';
import { login } from './../users/login';
import { findYourself } from './../users/findYourself';
import { updateUser } from './../users/updateUser';
import { deleteUser } from './../users/deleteUser';
import { userWebSocket } from './../users/webSocket';
dotenv.config();

interface User {
	id: string;
	name?: string;
	email: string;
	Preference: Preference | null;
	token: string;
	createdAt: Date;
	// other properties
}
interface Preference {
	id: string;
	name?: null | string;
	img?: null | string;
	experience?: null | string;
	personality?: null | string;
	theme: string;
	links?: null | {};
	userId?: string | null;
}

export interface MyContext {
	isAdmin: boolean;
	secretUsers?: string[];
	// pokemon: number;
	user?: User;
}
export const SECRET = process.env.SECRET || 'default-secret-value';

export const createToken = (_id: string) => {
	return jwt.sign({ _id }, SECRET, { expiresIn: '3d' });
};

export const userRouter = t.router({
	signUp: signUp,
	login: login,
	updateUser: updateUser,
	deleteUser: deleteUser,
	findYourself: findYourself,
	...userWebSocket,
});
