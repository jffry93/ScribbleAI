import { FaGithubAlt, FaLinkedinIn } from 'react-icons/fa';
import styled from 'styled-components';
import Logo from '../components/Logo';

const Footer = () => {
	return (
		<StyledFooter>
			<Logo size={100} />
			<p>CONTACT</p>
			<p>ABOUT</p>
			<p>PROJECTS</p>
			<StyledIconContainer>
				<StyledLink>
					<a href='https://github.com/jffry93' target='_blank'>
						<FaGithubAlt size={25} />
					</a>
				</StyledLink>
				<StyledLink>
					<a href='https://www.linkedin.com/in/jffry93/' target='_blank'>
						<FaLinkedinIn size={25} />
					</a>
				</StyledLink>
			</StyledIconContainer>
		</StyledFooter>
	);
};

export default Footer;

const StyledFooter = styled.footer`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	padding: var(--layout-padding);
	background-color: #121212;
	h1:active {
		color: var(--primary);
	}
	a {
		color: var(--text-color);
	}
`;
const StyledIconContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 16px;
`;
const StyledLink = styled.button`
	display: flex;
	justify-content: center;
	border-radius: 50%;
	padding: var(--sm-padding);
	a {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	svg {
		min-width: 25px;
	}
`;
