import styled from 'styled-components';
import ConvertDate from '../../components/ConvertDate';
import { useAuthContext } from '../../hooks/useAuthContext';
import LabelTitle from './LabelTitle';
import LinkTitle from './LinkTitle';
import ProfileImage from './ProfileImage';

const UserInfo = () => {
	const {
		state: { user },
	} = useAuthContext();
	return (
		<StyledContainer>
			<StyledDiv>
				<ProfileImage />
				<StyledContainer>
					<LabelTitle text={user?.email} label={'Email'} />
					<LabelTitle text={user?.preference.name} label={'Name'} />
					<LabelTitle text={user?.preference.experience} label={'Experience'} />
					<LabelTitle
						text={user?.preference.personality}
						label={'Personality'}
					/>
					<StyledLabelTitle>
						<h4>Joined on :</h4>
						<p>
							{user?.preference.createdAt ? (
								<ConvertDate text={user?.preference.createdAt} />
							) : (
								'N/A'
							)}
						</p>
					</StyledLabelTitle>
				</StyledContainer>
			</StyledDiv>
			<StyledLinkInfo>
				<h3>Clipboard Links</h3>
				<LinkTitle text={user?.preference.links.github} label={'Github'} />
				<LinkTitle text={user?.preference.links.linkedin} label={'Linkedin'} />
				<LinkTitle
					text={user?.preference.links.additional}
					label={'Additional'}
				/>
			</StyledLinkInfo>
		</StyledContainer>
	);
};

export default UserInfo;

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100%;
	p,
	span {
		color: var(--secondary-text-color);
	}
	h4 {
		font-size: 20px;
		width: fit-content;
	}
`;

const StyledDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;

	/* border: 1px solid red; */
`;
const StyledLinkInfo = styled.div`
	margin-top: var(--lg-padding);
	h3 {
		padding: var(--md-padding) var(--sm-padding);
	}
	width: 100%;
`;
const StyledLabelTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sm-padding);
`;
