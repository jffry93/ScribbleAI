import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import SignUp from '../components/SignUp';
import { device, StyledFlexCenter } from '../GlobalStyles';
import { useAuthContext } from '../hooks/useAuthContext';
import { trpc } from '../trpc/trpc';

const Navbar = () => {
	const navigate = useNavigate();
	const {
		state: { user },
	} = useAuthContext();

	return (
		<StyledSticky>
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
					<SignUp />
				</StyledLinkContainer>
			</StyledNav>
		</StyledSticky>
	);
};

export default Navbar;

const StyledSticky = styled.nav`
	position: sticky;
	top: 0;
	/* backdrop-filter: blur(10px); */
	/* background-color: var(--bg-color); */
	opacity: 0.9;
	z-index: 1;
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

		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}
	a {
		border: 1px solid yellow;
	}
`;
