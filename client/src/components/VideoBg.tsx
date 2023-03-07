import styled from 'styled-components';
import { device } from '../GlobalStyles';
import desktopVideo from '/bgVideo.mp4';
import mobileVideo from '/bgVideoMobile.mp4';

const VideoBg = () => {
	return (
		<StyledVideoBg>
			<video playsInline autoPlay loop muted>
				<source
					src={
						window.matchMedia(`(max-width: 650px)`).matches
							? mobileVideo
							: desktopVideo
					}
					type='video/mp4'
				/>
			</video>
		</StyledVideoBg>
	);
};

export default VideoBg;

const StyledVideoBg = styled.div`
	/* border: 1px solid pink; */
	position: absolute;
	top: 0;
	left: 0;
	min-height: 101vh;
	height: 100%;
	width: 100vw;
	overflow: hidden;
	video {
		min-width: 100%;
		min-height: 100vh;
		width: auto;
		height: 100%;
		z-index: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		object-fit: cover;
	}

	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
	}
	@media ${device.mobile} {
		flex-direction: column;
	}
`;
