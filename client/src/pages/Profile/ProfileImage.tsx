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
				<h1>
					{user?.preference.name && user?.preference.name[0].toUpperCase()}
				</h1>
				<img />
			</div>
			<StyledLabelTitle>
				<h4>Joined:</h4>
				<p>
					{user?.preference.createdAt ? (
						<ConvertDate text={user?.preference.createdAt} />
					) : (
						'N/A'
					)}
				</p>
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
		width: 300px;
		height: 300px;

		h1 {
			position: absolute;
			font-size: 120px;
		}
		/* img {
			height: 400px;
		} */
	}
`;
const StyledLabelTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding: var(--sm-padding);
`;
