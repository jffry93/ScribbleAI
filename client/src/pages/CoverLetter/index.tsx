import React, { useState } from 'react';
import CopyContainer from '../../components/CopyContainer';
import LoadingModal from '../../components/LoadingModal';
import { StyledHelper } from '../NSFW';
import ConvertCoverLetter from './ConvertLetter';

const CoverLetter = () => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<>
			<StyledHelper>
				<ConvertCoverLetter
					setIsLoading={setIsLoading}
					setAppropriateMsg={setAppropriateMsg}
				/>
				<CopyContainer appropriateMsg={appropriateMsg} />
			</StyledHelper>
			{isLoading && <LoadingModal />}
		</>
	);
};

export default CoverLetter;
