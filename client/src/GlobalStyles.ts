import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*{
    margin: 0 ;
    padding: 0 ;
    box-sizing: border-box ;
}

border-style,html,body{
  height:100%;
}
//DESKTOP
:root {
  --primary: #545AA7;
  --secondary:  #7B68EE;
  --error: #e7195a;
  --bg-color:  #121212;
  --text-color: #bbb;
  --secondary-text-color: #BBBBBB;
  --sm-padding: 12px;
  --md-padding: 24px;
  --lg-padding: 32px;
  --shift-padding: 63px;
  --layout-padding: 48px 32px 80px;
  --container-width-limit: 470px;
  --width-limit: 1280px;
	--navbar-height: 60px;
	--container-height: calc(100vh - var(--navbar-height) - 25.59px );
  background-color:#000;
  
}
//MOBILE
${({ theme }) => css`
	@media (max-width: 576px) {
		:root {
			--sm-padding: 8px;
			--md-padding: 16px;
			--lg-padding: 24px;
			--layout-padding: 32px 24px 64px;
			--container-width-limit: 400px;
			--shift-padding: 43px;
		}
	}
`}

a {
	font-weight: 500;
	color: var(--primary);
	text-decoration: none;
}

a:hover {
	color: var(--secondary);
}

body{
	color: var(--text-color);
	background-color: #000;
}
img{
  width: 100%;
}


`;

export default GlobalStyle;

const size = {
	mobile: '576px',
	tablet: '768px',
	desktop: '960px',
};

export const device = {
	// mobileS: `(min-width: ${size.mobileS})`,
	// mobileM: `(min-width: ${size.mobileM})`,
	// mobileL: `(min-width: ${size.mobileL})`,
	mobile: `(max-width: ${size.mobile})`,
	tablet: `(max-width: ${size.tablet})`,
	// laptop: `(min-width: ${size.laptop})`,
	// laptopL: `(min-width: ${size.laptopL})`,
	desktop: `(max-width: ${size.desktop})`,
	// desktopL: `(min-width: ${size.desktop})`,
};

export const StyledFlexCenter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledIconContainer = styled.button`
	padding: 10px;
	border: 0.1px solid #888;
	width: 40px;
	height: 40px;
	border-radius: 4px;
`;

export const StyledPage = styled.div`
	min-height: var(--container-height);
	display: flex;
	flex-direction: column;
	max-width: var(--width-limit);
	margin: auto;
`;

export const StyledMain = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;
export const StyledHelperPage = styled(StyledMain)`
	padding: 16px 32px 80px;
	flex-direction: row;

	gap: 32px;
	background-color: var(--bg-color);

	min-height: var(--container-height);
	@media (max-width: 900px) {
		flex-direction: column;
	}
`;
export const StyledJarvisForm = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	max-width: 500px;
	margin: auto;
	padding-top: 32px;
`;
