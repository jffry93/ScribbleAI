import styled from 'styled-components';
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
		</StyledImage>
	);
};

export default ProfileImage;

const StyledImage = styled(StyledFlexCenter)`
	flex: 1;

	width: 100%;
	.image-container {
		display: flex;
		align-items: center;
		justify-content: center;
		/* border: 1px solid red; */
		background-color: rgba(0, 0, 0, 0.2);
		/* overflow: hidden; */
		border-radius: 50%;
		width: 300px;
		height: 300px;
		h1 {
			position: absolute;
			font-size: 120px;
		}
		img {
			height: 400px;
		}
	}
`;
