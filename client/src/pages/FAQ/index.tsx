import React, { useState } from 'react';
import { JobDescriptionType } from '../../App';
import CopyContainer from '../../components/CopyContainer';
import LoadingModal from '../../components/LoadingModal';
import { StyledHelper } from '../NSFW';
import ConvertFAQ from './ConvertFAQ';

const FAQ = ({ jobDescription, setJobDescription }: JobDescriptionType) => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<>
			<StyledHelper>
				<ConvertFAQ
					jobDescription={jobDescription}
					setJobDescription={setJobDescription}
					setIsLoading={setIsLoading}
					setAppropriateMsg={setAppropriateMsg}
				/>
				<CopyContainer appropriateMsg={appropriateMsg} />
			</StyledHelper>
			{isLoading && <LoadingModal />}
		</>
	);
};

export default FAQ;
