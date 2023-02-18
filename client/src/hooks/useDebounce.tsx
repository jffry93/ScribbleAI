import { useEffect, useState, useCallback, useRef } from 'react';

export const useDebounceState = <T,>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Create a timer ID
		const timerId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Cancel the timer on cleanup
		return () => {
			clearTimeout(timerId);
		};
	}, [value, delay]);

	return debouncedValue;
};

/*

Example of how to use it

import { useState } from 'react';

function MyComponent() {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 500);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <p>Debounced value: {debouncedInputValue}</p>
    </div>
  );
}


*/

type CallbackFunction<T extends any[]> = (...args: T) => void;

export const useDebounceCallback = <T extends any[]>(
	callback: CallbackFunction<T>,
	delay: number = 500
): CallbackFunction<T> => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	return useCallback(
		(...args: T) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);
};
