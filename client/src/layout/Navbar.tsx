import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from '../components/SignUp';
import { device } from '../GlobalStyles';

const Navbar = () => {
	return (
		<div>
			<StyledNav>
				<StyledLogo to={`/`}>
					<h2>ProfessionalPen</h2>
					<img src='../../public/feather.png' />
				</StyledLogo>
				<SignUp />
			</StyledNav>
		</div>
	);
};

export default Navbar;

const StyledNav = styled.nav`
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
`;

const StyledLogo = styled(Link)`
	display: flex;
	align-items: center;
	img {
		width: 50px;
		filter: invert(35%) sepia(85%) saturate(561%) hue-rotate(201deg)
			brightness(113%) contrast(108%);
	}
	@media ${device.mobile} {
		h2 {
			display: none;
		}
	}
`;
