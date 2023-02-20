import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { trpc } from '../trpc/trpc';

const GetUser = () => {
	const {
		state: { user },
		dispatch,
	} = useAuthContext();
	const handleAsyncQuery = trpc.user.findYourself.useQuery();
	console.log(user);
	const onAsyncQuery = async () => {
		try {
			const res: any = await handleAsyncQuery.refetch();
			console.log(res.data);
			if (res.data?.status > 200) {
			} else {
				dispatch({
					type: 'LOGIN',
					payload: { ...user, preference: { ...res.data.preference } },
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (!user?.preference) onAsyncQuery();
	}, []);
	return <></>;
};

export default GetUser;
