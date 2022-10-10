import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" >Whats Cookin'</Navbar.Brand>
        <Nav className="me-auto">
          {Auth.loggedIn() && (
            <>
              <Nav.Link as={Link} to="/new-post" >New</Nav.Link>
            </>
          )}
          {Auth.loggedIn() ? (
            <>
              <Nav.Link as={Link} to="/profile" >Me</Nav.Link>
              <Nav.Link as={Link} to="/logout" onClick={logout} >Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" >Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};


export default Header;
