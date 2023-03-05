import { useState } from 'react';
import { JobDescriptionType } from '../../App';
import CopyContainer from '../../components/CopyContainer';
import { StyledHelperPage } from '../../GlobalStyles';
import ConvertGratitude from './ConvertGratitude';

const Gratitude = ({
	jobDescription,
	setJobDescription,
}: JobDescriptionType) => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);

	return (
		<StyledHelperPage>
			<ConvertGratitude
				jobDescription={jobDescription}
				setJobDescription={setJobDescription}
				setAppropriateMsg={setAppropriateMsg}
			/>
			<CopyContainer appropriateMsg={appropriateMsg} />
		</StyledHelperPage>
	);
};

export default Gratitude;
