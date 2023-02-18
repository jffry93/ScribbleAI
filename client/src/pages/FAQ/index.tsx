import React, { useState } from 'react';
import CopyContainer from '../../components/CopyContainer';
import { StyledHelper } from '../NSFW';
import ConvertFAQ from './ConvertFAQ';

const FAQ = () => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	return (
		<StyledHelper>
			<ConvertFAQ
				appropriateMsg={appropriateMsg}
				setAppropriateMsg={setAppropriateMsg}
			/>
			<CopyContainer appropriateMsg={appropriateMsg} />
		</StyledHelper>
	);
};

export default FAQ;
