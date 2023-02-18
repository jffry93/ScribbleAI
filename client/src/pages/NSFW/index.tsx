import { useState } from 'react';
import styled from 'styled-components';
import { StyledMain } from '../../GlobalStyles';
import ConvertNsfw from './ConvertNsfw';
import CopyContainer from '../../components/CopyContainer';
import LoadingModal from '../../components/LoadingModal';

const NSFW = () => {
	const [appropriateMsg, setAppropriateMsg] = useState<string | undefined>(
		undefined
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<>
			<StyledHelper>
				<ConvertNsfw
					setAppropriateMsg={setAppropriateMsg}
					setIsLoading={setIsLoading}
				/>
				<CopyContainer appropriateMsg={appropriateMsg} />
			</StyledHelper>
			{isLoading && <LoadingModal />}
		</>
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
