import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {LinkContainer} from 'react-router-bootstrap'
import './Navbar.css'

const Header = ({ user, handleLogout }) => {

  if (user) {
    return(
      <>
      <Navbar sticky='top' collapseOnSelect expand="lg" bg="black" variant="dark">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='logoFont' href="#home">
              <img
                alt=""
                src="https://i.imgur.com/eNExTFg.png"
                width="60"
                height="60"
                className="d-inline-block align-top"
              />{" "}
              CryptoWatch
            </Navbar.Brand>
          </LinkContainer>
         

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <LinkContainer to={`/${user?.username}`}>
                <Nav.Link className="navLinks">{user.username}'s Watchlist</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/' onClick={handleLogout}>
                <Nav.Link className="navLinks">Log Out</Nav.Link>
              </LinkContainer>
      
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
      
      
    )
  }
  return (
    <>
      <Navbar sticky='top' collapseOnSelect expand="lg" bg="black" variant="dark">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='logoFont' href="#home">
              <img
                alt=""
                src="https://i.imgur.com/eNExTFg.png"
                width="60"
                height="60"
                className="d-inline-block align-top"
              />{" "}
              CryptoWatch
            </Navbar.Brand>
          </LinkContainer>
         

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">About</Nav.Link> */}
              {/* <NavDropdown title="Movies" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <LinkContainer to='/login'>
                <Nav.Link className="navLinks">Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/signup'>
                <Nav.Link className="navLinks">Sign Up</Nav.Link>
              </LinkContainer>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;