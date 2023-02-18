import styled from 'styled-components';
import { StyledFlexCenter } from '../../GlobalStyles';

const ProfileImage = () => {
	return (
		<StyledImage>
			<div className='image-container'>
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
		border: 1px solid red;
		overflow: hidden;
		border-radius: 50%;
		width: 300px;
		height: 300px;
		img {
			/* width: 100%; */
			height: 400px;
			background-color: aqua;
		}
	}
`;
