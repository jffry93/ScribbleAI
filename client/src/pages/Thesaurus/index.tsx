import { useState } from 'react';
import { StyledHelperPage } from '../../GlobalStyles';
import ReviewPhrase from './ReviewPhrase';
import CopyContainer from '../../components/CopyContainer';

const Thesaurus = () => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);

	return (
		<StyledHelperPage>
			<ReviewPhrase setAppropriateMsg={setAppropriateMsg} />
			<CopyContainer appropriateMsg={appropriateMsg} />
		</StyledHelperPage>
	);
};

export default Thesaurus;
