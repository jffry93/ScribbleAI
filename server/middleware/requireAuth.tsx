import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma } from '../db';
dotenv.config();

const SECRET = process.env.SECRET || 'default-secret-value';

const requireAuth = async (req, res, next) => {
	// verify user authentication
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: 'Authorization token required' });
	}
	const token = authorization.split(' ')[1];
	try {
		const jwtData = jwt.verify(token, SECRET);
		if (typeof jwtData === 'string') {
			throw new Error('Invalid token');
		}
		const { _id } = jwtData;

		//select returns object with keys specified
		const userId = await prisma.user.findFirst({
			where: { id: _id },
		});
		console.log('🤦🏽‍♂️', userId);
		if (!userId) {
			throw new Error("Token doesn't match userId");
		}
		console.log('ITS A MATCH ❤️');

		req.user = userId;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: 'Request is not authorized' });
	}
};

module.exports = requireAuth;
