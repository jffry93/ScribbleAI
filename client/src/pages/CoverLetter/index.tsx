import { useState } from 'react';
import { JobDescriptionType } from '../../App';
import CopyContainer from '../../components/CopyContainer';
import { StyledHelperPage } from '../../GlobalStyles';
import ConvertCoverLetter from './ConvertLetter';

const CoverLetter = ({
	jobDescription,
	setJobDescription,
}: JobDescriptionType) => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);

	return (
		<StyledHelperPage>
			<ConvertCoverLetter
				jobDescription={jobDescription}
				setJobDescription={setJobDescription}
				setAppropriateMsg={setAppropriateMsg}
			/>
			<CopyContainer appropriateMsg={appropriateMsg} />
		</StyledHelperPage>
	);
};

export default CoverLetter;
