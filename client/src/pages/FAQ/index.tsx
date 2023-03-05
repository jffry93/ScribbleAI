import { useState } from 'react';
import { JobDescriptionType } from '../../App';
import CopyContainer from '../../components/CopyContainer';
import { StyledHelperPage } from '../../GlobalStyles';
import ConvertFAQ from './ConvertFAQ';

const FAQ = ({ jobDescription, setJobDescription }: JobDescriptionType) => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	return (
		<StyledHelperPage>
			<ConvertFAQ
				jobDescription={jobDescription}
				setJobDescription={setJobDescription}
				setAppropriateMsg={setAppropriateMsg}
			/>
			<CopyContainer appropriateMsg={appropriateMsg} />
		</StyledHelperPage>
	);
};

export default FAQ;
