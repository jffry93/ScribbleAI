import { useState } from 'react';
import CopyContainer from '../../components/CopyContainer';
import { StyledHelperPage } from '../../GlobalStyles';
import ConvertGrammar from './ConvertGrammar';

const Grammar = () => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);

	return (
		<StyledHelperPage>
			<ConvertGrammar setAppropriateMsg={setAppropriateMsg} />
			<CopyContainer appropriateMsg={appropriateMsg} />
		</StyledHelperPage>
	);
};

export default Grammar;
