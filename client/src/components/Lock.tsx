import React, { useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa';
const Lock = () => {
	const [lock, setLock] = useState(true);
	return (
		<li onClick={() => setLock(!lock)}>
			{lock ? <FaLock size={'20'} /> : <FaUnlock size={'20'} />}
		</li>
	);
};

export default Lock;
