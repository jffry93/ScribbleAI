import { useState } from 'react';
import styled from 'styled-components';
import { StyledMain } from '../../GlobalStyles';
import ConvertNsfw from './ConvertNsfw';
import CopyContainer from '../../components/CopyContainer';

const NSFW = () => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	return (
		<StyledHelper>
			<ConvertNsfw
				appropriateMsg={appropriateMsg}
				setAppropriateMsg={setAppropriateMsg}
			/>
			<CopyContainer appropriateMsg={appropriateMsg} />
		</StyledHelper>
	);
};

export default NSFW;

export const StyledHelper = styled(StyledMain)`
	padding: var(--layout-padding);
	flex-direction: row;
	gap: 32px;
	min-height: var(--container-height);

	@media (max-width: 900px) {
		flex-direction: column;
	}
`;
