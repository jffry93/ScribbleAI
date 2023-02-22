import React, { useState } from 'react';
import CopyContainer from '../../components/CopyContainer';
import LoadingModal from '../../components/LoadingModal';
import { StyledHelper } from '../NSFW';
import ConvertCoverLetter from './ConvertLetter';
interface JobDescriptionType {
	jobDescription: string;
	setJobDescription: (value: string) => void;
}
const CoverLetter = ({
	jobDescription,
	setJobDescription,
}: JobDescriptionType) => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<>
			<StyledHelper>
				<ConvertCoverLetter
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

export default CoverLetter;
