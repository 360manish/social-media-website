import React,{useState} from 'react'
import { Navbar,Button,NavDropdown,Nav,Container } from 'react-bootstrap'
import { useAuth } from "../context/AuthContex";
import { Link,useNavigate } from 'react-router-dom';
export default function UserNavbar() {
    const [error, setError] = useState("");
    const { currentUser,logout } = useAuth();
    const navigate=useNavigate()
    async function  handleLogout() {
        setError('')
        try{
        await logout()
        navigate('/login')
        }catch(error){
        console.log(error)
        setError('Failed to logout')
        }
    }
  return (
    <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">{currentUser?<Link className='nav-link' to='update-profile'><h4>{currentUser.email.replace("@gmail.com","")}</h4></Link>:<h4>Please Login</h4>}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Link className='nav-link' to='/'>Home</Link>
        {currentUser?<Link className='nav-link' to='/create-post'>Create new post</Link>:<></>}
        

        <NavDropdown title="Your Info" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">View Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">All Posts</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Liked Posts</NavDropdown.Item>
          {/* <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
        </NavDropdown>
        <Button style={{marginLeft:"auto"}} onClick={handleLogout}>logout</Button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
