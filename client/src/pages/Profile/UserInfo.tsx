import { AiOutlineLink } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { FaGithubAlt, FaLinkedinIn } from 'react-icons/fa';
import styled from 'styled-components';
import ConvertDate from '../../components/ConvertDate';
import { device } from '../../GlobalStyles';
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
				</StyledContainer>
			</StyledDiv>
			<StyledLinkInfo>
				<h3>Clipboard Links</h3>
				<div className='row'>
					<FaGithubAlt size={25} />
					<LinkTitle text={user?.preference.links.github} label={'Github'} />
				</div>
				<div className='row'>
					<FaLinkedinIn size={25} />
					<LinkTitle
						text={user?.preference.links.linkedin}
						label={'Linkedin'}
					/>
				</div>
				<div className='row'>
					<AiOutlineLink size={25} />

					<LinkTitle
						text={user?.preference.links.additional}
						label={'Additional'}
					/>
				</div>
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
	gap: 32px;
	width: 100%;
`;
const StyledLinkInfo = styled.div`
	margin-top: var(--lg-padding);
	.row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding-left: var(--sm-padding);
		svg {
			min-width: 25px;
		}
	}
	h3 {
		padding: var(--md-padding) var(--sm-padding);
	}
	width: 100%;
	@media ${device.mobile} {
		h4 {
			display: none;
		}
	}
`;
const StyledLabelTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--sm-padding);
`;
