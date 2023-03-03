import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*{
    margin: 0 ;
    padding: 0 ;
    box-sizing: border-box ;
}
border-style,html{
  height:100%;
  
}
//DESKTOP
:root {
  --primary: #696969;
  --secondary:  #8ab6d6;
  --error: #e7195a;
  --bg-color:  #242424;
  --text-color: #ddd;
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
  background-color:#121212;
  
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

h1 {
	font-size: 3.6em;
	line-height: 1.1;
}
h2{
  font-size: 2.8em;
	line-height: 1.1;
}
h3{
  font-size: 2.2em;
	line-height: 1.1;
}
h4{
  font-size: 1.6em;
	line-height: 1.1;
}
li,p{
	letter-spacing: 0.5px;
	line-height: 1.5;
	font-size: 20px;
}

ul {
	list-style-type: circle;
}
a {
	font-weight: 500;
	color: var(--primary);
	text-decoration: var(--secondary);
}

a:hover {
	color: var(--primary);
}

body{
  /* color-scheme: light dark; */
	color: var(--text-color);
	/* background-color: var(--bg-color) */
}
img{
  width: 100%;
}

input,
textarea{
  font-family:unset;
  background-color: #ddd;
  border-radius: 4px;
}
button {
	border-radius: 4px;
	border: 0px ;
	padding: 0.6em 1.2em;
	font-size: 1.2em;
	font-weight: 500;
	font-family: inherit;
  color: #ccc;
	background-color: var(--primary);
	cursor: pointer;
	width: 100%;
}
button:hover {
  outline: 1px solid var(--secondary);
  box-shadow: 0 0 10px #719ECE;
}
input:focus,
input:focus-visible,
textarea:focus,
textarea:focus-visible{
  outline: none !important;
    border:1px solid var(--secondary);
    box-shadow: 0 0 10px #719ECE;
}


button:focus,
button:focus-visible {
	outline: 2px solid #a2d8ff;
  /* border:1px solid var(--secondary); */
  
}
/* 
@media (prefers-color-scheme: light) {
	:root {
    --primary: #696969;
  --secondary:  #8ab6d6;
  --error: #e7195a;
  --bg-color:  #242424;
  --text-color: #F5F5F5;
  --secondary-text-color: #58627c;
    --text-color: #3f4654;
		color: #353B47;
		background-color: #eee;
	}
	a:hover {
		color: #747bff;
	}
	button {
		background-color: #f9f9f9;
	}
} */
`;

export default GlobalStyle;

const size = {
	// mobileS: '320px',
	// mobileM: '375px',
	// mobileL: '425px',
	mobile: '576px',
	tablet: '768px',
	// laptop: '1024px',
	// laptopL: '1440px',
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
export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	input {
		border-radius: 4px;
		width: 100%;
		padding: 8px;
		font-size: 20px;
	}
	button {
		margin: 8px 0 12px;
		padding: var(--sm-padding);
	}
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
