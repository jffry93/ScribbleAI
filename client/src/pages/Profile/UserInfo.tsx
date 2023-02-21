import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../hooks/useAuthContext';
import LabelTitle from './LabelTitle';

const UserInfo = () => {
	const {
		state: { user },
	} = useAuthContext();
	return (
		<StyledContainer>
			<LabelTitle text={user?.email} label={'Email'} />
			<LabelTitle text={user?.preference.name} label={'Name'} />
			<LabelTitle text={user?.preference.experience} label={'Experience'} />
			<LabelTitle text={user?.preference.personality} label={'Personality'} />
			<StyledLabelTitle>
				<p>Joined on :</p>
				<h4>
					{user?.preference.createdAt ? `${user?.preference.createdAt}` : 'N/A'}
				</h4>
			</StyledLabelTitle>
		</StyledContainer>
	);
};

export default UserInfo;

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const StyledLabelTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid yellow;
	padding: var(--sm-padding);
`;
