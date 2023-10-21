import React from 'react';
import { Button, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';
import { auth, logout } from '../auth/firebase';
import { useState } from 'react';

const Layout = () => {
  const [user, loading] = useAuthState(auth);
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!expanded);
  };
  return (
    <Container fluid>
      <Row>
        <Navbar expand="lg" expanded={expanded}>
          <Container className="justify-content-end">
            <Navbar.Toggle onClick={toggleMenu} aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Col>
                <Nav>
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/countries">
                    <Nav.Link>Countries</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/favourites">
                    <Nav.Link>Favourites</Nav.Link>
                  </LinkContainer >
                </Nav>
              </Col>
              <Col>
                <Nav className="justify-content-end">
                  {user ? (
                    <Button variant="info" hidden={loading} onClick={logout}>
                      Logout</Button>) : (<LinkContainer to="/login"><Nav.Link>Log In</Nav.Link></LinkContainer>)}
                </Nav>
              </Col>
            </Navbar.Collapse>
          </Container>
        </Navbar >
      </Row >
      <Row>
        <Outlet />
      </Row>
    </Container >
  );
};

export default Layout;
