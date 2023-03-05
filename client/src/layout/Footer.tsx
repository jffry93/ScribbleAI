import { FaGithubAlt, FaLinkedinIn } from 'react-icons/fa';
import styled from 'styled-components';
import Logo from '../components/Logo';
import Mailto from '../components/MailTo';
import CreatedBy from './CreatedBy';

const Footer = () => {
	return (
		<StyledFooter>
			<StyledContent>
				<StyledLeft>
					<Logo size={60} font={40} />
					<Mailto label='CONTACT' mailto='jay.zalischi@gmail.com' />
					<a
						className='link'
						href='https://jffry-linktree.vercel.app/'
						target='_blank'
					>
						PROJECTS
					</a>
					<a
						className='link'
						href='https://github.com/jffry93/ScribbleAI'
						target='_blank'
					>
						ABOUT
					</a>
				</StyledLeft>
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
			</StyledContent>
			<CreatedBy />
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
	background-color: #000;
	h1:active {
		color: var(--primary);
	}
	a {
		color: var(--text-color);
	}
	.link {
		margin-left: 8px;
		margin-top: 8px;
	}
`;

const StyledContent = styled.div`
	display: flex;
	justify-content: space-between;
	padding: var(--layout-padding);
	width: 100%;
	max-width: var(--width-limit);
`;

const StyledLeft = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
const StyledIconContainer = styled.div`
	display: flex;
	align-items: flex-start;
	/* justify-content: center; */
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
