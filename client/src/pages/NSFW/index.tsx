import { useState } from 'react';
import { StyledHelperPage } from '../../GlobalStyles';
import ConvertNsfw from './ConvertNsfw';
import CopyContainer from '../../components/CopyContainer';

const NSFW = () => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);

	return (
		<StyledHelperPage>
			<ConvertNsfw setAppropriateMsg={setAppropriateMsg} />
			<CopyContainer appropriateMsg={appropriateMsg} />
		</StyledHelperPage>
	);
};

export default NSFW;
