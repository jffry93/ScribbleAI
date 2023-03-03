import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import LoginButton from '../components/LoginButton';
import { device, StyledFlexCenter } from '../GlobalStyles';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
	const navigate = useNavigate();
	const {
		state: { user },
	} = useAuthContext();
	const [showBackground, setShowBackground] = useState(false);

	useEffect(() => {
		function handleScroll() {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			if (scrollTop > 100) {
				setShowBackground(true);
			} else {
				setShowBackground(false);
			}
		}

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<StyledSticky showBackground={showBackground}>
			<StyledNav>
				<Logo size={50} font={24} />
				<StyledLinkContainer>
					{user && (
						<>
							<StyledDropDown>
								<p className='title'>HELPER</p>
								<ul>
									<li onClick={() => navigate('/nsfw')}>
										<span>To Professional</span>
									</li>
									<li onClick={() => navigate('/coverletter')}>
										<span>Cover Letter</span>
									</li>
									<li onClick={() => navigate('/gratitude')}>
										<span>Gratitude</span>
									</li>
									<li onClick={() => navigate('/grammar')}>
										<span>Grammar Machine</span>
									</li>
									<li onClick={() => navigate('/thesaurus')}>
										<span>ThesaurusRex</span>
									</li>
									<li onClick={() => navigate('/faq')}>
										<span>Q&A</span>
									</li>
								</ul>
							</StyledDropDown>
							<Link to='profile' className='title'>
								PROFILE
							</Link>
						</>
					)}
					<LoginButton />
				</StyledLinkContainer>
			</StyledNav>
		</StyledSticky>
	);
};

export default Navbar;

interface MyStyledComponentProps {
	showBackground?: boolean;
}
const StyledSticky = styled.nav<MyStyledComponentProps>`
	position: sticky;
	top: 0;
	z-index: 2;
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: ${({ showBackground }) => (showBackground ? '1' : '0')};
		transition: opacity 0.3s ease-in-out;
		background-color: #121212;
	}
`;

const StyledNav = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 var(--md-padding);
	height: var(--navbar-height);
	max-width: var(--width-limit);
	margin: auto;

	ul {
		list-style: none;
	}
	a,
	.title {
		position: relative;
		color: var(--text-color);
		font-size: 12px;
		&:active {
			color: var(--primary);
		}
	}
`;
const StyledLinkContainer = styled(StyledFlexCenter)`
	gap: 24px;
	> * {
		border-radius: 4px;
		padding: 8px 12px;
		cursor: pointer;
		li {
			font-size: 14px;
			background-color: #1d1d1e;
		}
		&:hover {
			background-color: #1d1d1e;
			ul {
				display: block;
			}

			li:hover {
				position: relative;
				background-color: var(--primary);
				span {
					position: relative;
					z-index: 2;
				}
				cursor: pointer;
				&:active::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.2);
					z-index: 1;
					border-radius: inherit;
				}
			}
		}
	}
`;

const StyledDropDown = styled.div`
	position: relative;
	border-radius: 4px;

	li {
		padding: 8px 12px;
		cursor: pointer;
	}
	ul {
		display: none;
		width: 150px;
		position: absolute;
		left: 0;
		top: 100%;
		overflow: hidden;
		border-radius: 4px;
	}
	a {
		border: 1px solid yellow;
	}
`;
