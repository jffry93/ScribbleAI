import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import LoginButton from '../../components/LoginButton';
import { device, StyledFlexCenter } from '../../GlobalStyles';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Typography, useTheme } from '@mui/material';

const helperDropdown = [
	{
		path: '/nsfw',
		title: 'To Professional',
	},
	{
		path: '/coverletter',
		title: 'Cover Letter',
	},
	{
		path: '/gratitude',
		title: 'Gratitude',
	},
	{
		path: '/grammar',
		title: 'Grammar',
	},
	{
		path: '/thesaurus',
		title: 'Thesaurus',
	},
	{
		path: '/faq',
		title: 'FAQ',
	},
];

const Navbar = () => {
	const navigate = useNavigate();
	const {
		state: { user },
	} = useAuthContext();
	const [showBackground, setShowBackground] = useState(false);
	const { palette } = useTheme();
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
				<StyledLinkContainer theme={palette}>
					{user && (
						<>
							<StyledDropDown>
								<Typography className='title'>HELPER</Typography>
								<ul>
									{helperDropdown.map((data) => (
										<li key={data.title} onClick={() => navigate(data.path)}>
											<Typography variant='body2'>{data.title}</Typography>
										</li>
									))}
								</ul>
							</StyledDropDown>
							<Typography
								className='title'
								onClick={() => {
									navigate('/profile');
								}}
							>
								<p>PROFILE</p>
							</Typography>
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

	.title {
		position: relative;
		color: #aaa;
		/* color: var(--text-color); */
		font-size: 12px;
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
			background-color: #2d2d2d;
		}
		&:hover {
			background-color: #2d2d2d;

			ul {
				display: block;
				background-color: #2d2d2d;
			}

			li:hover {
				position: relative;
				${(props) => {
					return 'background-color: ' + props.theme.secondary.main;
				}};
				span {
					position: relative;
					z-index: 2;
				}
				cursor: pointer;
				&:active {
					color: #aaa;
					${(props) => {
						return 'background-color: ' + props.theme.primary.main;
					}};
					border-radius: none;
				}
			}
		}
		/* &:active {
			background-color: var(--primary);
		} */
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
