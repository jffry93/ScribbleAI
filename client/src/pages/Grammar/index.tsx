import React, { useState } from 'react';
import { JobDescriptionType } from '../../App';
import CopyContainer from '../../components/CopyContainer';
import LoadingModal from '../../components/LoadingModal';
import { StyledHelper } from '../NSFW';
import ConvertGrammar from './ConvertGrammar';

const Grammar = () => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<>
			<StyledHelper>
				<ConvertGrammar
					setIsLoading={setIsLoading}
					setBeautifulText={setAppropriateMsg}
				/>
				<CopyContainer appropriateMsg={appropriateMsg} />
			</StyledHelper>
			{isLoading && <LoadingModal />}
		</>
	);
};

export default Grammar;
