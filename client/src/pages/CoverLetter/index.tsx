import React, { useState } from 'react';
import CopyContainer from '../../components/CopyContainer';
import { StyledHelper } from '../NSFW';
import ConvertCoverLetter from './ConvertLetter';

const CoverLetter = () => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	return (
		<StyledHelper>
			<ConvertCoverLetter
				appropriateMsg={appropriateMsg}
				setAppropriateMsg={setAppropriateMsg}
			/>
			<CopyContainer appropriateMsg={appropriateMsg} />
		</StyledHelper>
	);
};

export default CoverLetter;
