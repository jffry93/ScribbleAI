import { useEffect, useState, useCallback, useRef } from 'react';
import { useDebounceCallback } from './useDebounce';

export interface JarvisProps {
	setIsLoading: (value: boolean) => void;
	setAppropriateMsg: (value: string | undefined) => void;
}

export const useMutateJarvis = ({
	handleMutate,
	setIsLoading,
	setAppropriateMsg,
}: {
	handleMutate: any;
	setIsLoading: (value: boolean) => void;
	setAppropriateMsg: (value: string | undefined) => void;
}) => {
	const [error, setError] = useState({ value: false, message: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const debouncedSubmit = useDebounceCallback(async (mutateData: any) => {
		try {
			if (isSubmitting) {
				return; // don't make multiple requests
			}
			//disable multiple requests and open loading modal
			setIsSubmitting(true);
			setIsLoading(true);
			//send data to backend and wait for response
			const response = await handleMutate();
			if (response.status < 300) {
				//store data, end loading and remove error message
				setAppropriateMsg(response.data);
				setIsLoading(false);
				setError({ value: false, message: '' });
			} else {
				//end loading and display error message
				setIsLoading(false);
				setError({ value: true, message: response.msg });
			}
			setIsSubmitting(false); // allow for more submissions
		} catch (error) {
			const errorMessage = (error as { message: string }).message;
			setError({ value: true, message: errorMessage });
			setIsLoading(false);
		}
	}, 250);

	return { debouncedSubmit, error };
};
