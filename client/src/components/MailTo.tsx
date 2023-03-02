import React from 'react';

const Mailto = ({ mailto, label }: { mailto: string; label: string }) => {
	return (
		<a className='link' href={'mailto:' + mailto}>
			{label}
		</a>
	);
};

export default Mailto;
