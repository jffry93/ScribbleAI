import { useState } from 'react';
import LoadPage from '../components/LoadPage';
import CoverLetter from '../pages/CoverLetter';
import FAQ from '../pages/FAQ';
import Grammar from '../pages/Grammar';
import Gratitude from '../pages/Gratitude';
import NSFW from '../pages/NSFW';
import Profile from '../pages/Profile';

import Thesaurus from '../pages/Thesaurus';

export const useUserRouteData = () => {
	const [jobDescription, setJobDescription] = useState('');

	const userRouteData = [
		{
			path: '/test',
			element: () => (
				<LoadPage
					Component={Gratitude}
					props={{ jobDescription, setJobDescription }}
				/>
			),
		},
		{
			path: '/nsfw',
			element: () => <NSFW />,
		},
		{
			path: '/faq',
			element: () => (
				<LoadPage
					Component={FAQ}
					props={{ jobDescription, setJobDescription }}
				/>
			),
		},
		{
			path: '/coverletter',
			element: () => (
				<LoadPage
					Component={CoverLetter}
					props={{ jobDescription, setJobDescription }}
				/>
			),
		},
		{
			path: '/gratitude',
			element: () => (
				<LoadPage
					Component={Gratitude}
					props={{ jobDescription, setJobDescription }}
				/>
			),
		},
		{
			path: '/grammar',
			element: () => <LoadPage Component={Grammar} />,
		},
		{
			path: '/thesaurus',
			element: () => <LoadPage Component={Thesaurus} />,
		},
		{
			path: '/profile',
			element: () => <LoadPage Component={Profile} />,
		},
	];

	return userRouteData;
};
