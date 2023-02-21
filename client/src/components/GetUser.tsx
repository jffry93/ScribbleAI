import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { trpc } from '../trpc/trpc';

const GetUser = () => {
	const {
		state: { user },
		dispatch,
	} = useAuthContext();
	const handleAsyncQuery = trpc.user.findYourself.useQuery();
	const onAsyncQuery = async () => {
		try {
			const res: any = await handleAsyncQuery.refetch();

			if (res.data?.status > 200) {
			} else {
				dispatch({
					type: 'LOGIN',
					payload: {
						...user,
						preference: { ...res.data.preference },
					},
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
