import { Typography } from '@mui/material';
import styled from 'styled-components';
import ConvertDate from '../../components/ConvertDate';
import { StyledFlexCenter } from '../../GlobalStyles';
import { useAuthContext } from '../../hooks/useAuthContext';

const ProfileImage = () => {
	const {
		state: { user },
	} = useAuthContext();
	return (
		<StyledImage>
			<div className='image-container'>
				<Typography variant='h1'>
					{user?.preference.name && user?.preference.name[0].toUpperCase()}
				</Typography>
				<img />
			</div>
			<StyledLabelTitle>
				<Typography>Joined:</Typography>
				<Typography variant='h6'>
					{user?.preference.createdAt ? (
						<ConvertDate text={user?.preference.createdAt} />
					) : (
						'N/A'
					)}
				</Typography>
			</StyledLabelTitle>
		</StyledImage>
	);
};

export default ProfileImage;

const StyledImage = styled(StyledFlexCenter)`
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 20px;

	.image-container {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		min-width: 250px;
		height: 250px;

		h1 {
			position: absolute;
			font-size: 120px;
		}
	}
`;
const StyledLabelTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding: var(--sm-padding);
`;
