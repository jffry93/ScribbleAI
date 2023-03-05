import React, { useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa';
import styled from 'styled-components';
import { device, StyledIconContainer } from '../GlobalStyles';

interface LockProps {
	lockIcon: boolean;
	setLockIcon: (value: boolean) => void;
}
const Lock = ({ lockIcon, setLockIcon }: LockProps) => {
	return (
		<StyledLock onClick={() => setLockIcon(!lockIcon)}>
			{lockIcon ? <FaLock size={'20'} /> : <FaUnlock size={'20'} />}
		</StyledLock>
	);
};

export default Lock;
const StyledLock = styled(StyledIconContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: var(--md-padding);
	right: var(--md-padding);
	background-color: unset;
	border: unset;

	@media ${device.mobile} {
		& {
			top: 0;
		}
	}
`;
