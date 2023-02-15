import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from '../components/SignUp';

const Navbar = () => {
	return (
		<StyledNav>
			<Link to={`/`}>
				<h2>DailyRoutine</h2>
			</Link>
			<SignUp />
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
