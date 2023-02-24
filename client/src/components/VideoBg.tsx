// import { LazyLoad } from 'react-lazyload';
import styled from 'styled-components';
import { device } from '../GlobalStyles';

const VideoBg = ({
	desktopVideo,
	mobileVideo,
}: {
	desktopVideo: string;
	mobileVideo: string;
}) => {
	return (
		<StyledVideoBg>
			{/* <LazyLoad> */}
			<video autoPlay loop muted>
				<source
					src={
						window.matchMedia(`(max-width: 650px)`).matches
							? mobileVideo
							: desktopVideo
					}
					type='video/mp4'
				/>
			</video>
			{/* </LazyLoad> */}
		</StyledVideoBg>
	);
};

export default VideoBg;

const StyledVideoBg = styled.div`
	/* border: 1px solid pink; */
	position: fixed;
	top: 0;
	left: 0;
	min-height: 100vh;
	width: 100%;
	overflow: hidden;
	video {
		min-width: 100%;
		min-height: 100%;
		width: auto;
		height: auto;
		z-index: -100;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
	}
	@media ${device.mobile} {
		flex-direction: column;
	}
`;
