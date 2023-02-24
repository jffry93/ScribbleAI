import { MyContext } from '../users';
import { legitCheckProcedure } from '../../middleware/legitCheckMiddleware';
export const findYourself = legitCheckProcedure.query(
	async ({ ctx }: { ctx: MyContext }) => {
		try {
			const { user } = ctx;

			if (user?.Preference) {
				const { Preference, createdAt } = user;
				const { experience, personality, name, theme, img, links } = Preference;

				return {
					status: 200,
					preference: {
						experience,
						personality,
						name,
						theme,
						img,
						createdAt,
						links,
					},
					msg: '✅ Successful login',
				};
			}

			return {
				status: 400,
				msg: 'Successful but no user found',
				preference: {},
			};
		} catch (err) {
			console.log((err as Error).message);
			return {
				status: 500,
				msg: (err as Error).message,
			};
		}
	}
);
