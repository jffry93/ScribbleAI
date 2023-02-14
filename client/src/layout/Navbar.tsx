import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
	return (
		<StyledNav>
			<Link to={`/`}>
				<h2>Logo</h2>
			</Link>
			<ul>
				<li>
					<Link to={`/examples`}>Examples</Link>
				</li>
			</ul>
		</StyledNav>
	);
};

export default Navbar;

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 var(--md-padding);
	height: var(--navbar-height);
	ul {
		list-style: none;
	}
`;
