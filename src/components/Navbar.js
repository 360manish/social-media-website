import React from 'react'
import { Navbar,NavDropdown,Nav,Container } from 'react-bootstrap'
import { useAuth } from "../context/AuthContex";
export default function UserNavbar() {
    const {currentUser}=useAuth()
  return (
    <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">{currentUser?<h4>{currentUser.email.replace("@gmail.com","")}</h4>:<h4>Login</h4>}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">View Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">All Posts</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Liked Posts</NavDropdown.Item>
          {/* <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
