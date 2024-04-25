import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { App, RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';


export default function NavBar(){

    const navigate = useNavigate();

    return(
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand 
                className='kursor'
                onClick={()=>navigate(RoutesNames.HOME)}
                >Salon Za Pse</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link 
                    href={App.URL + '/swagger/index.html'}
                    target='_blank'>API</Nav.Link>
                    
                    <NavDropdown title="Izbornik" id="collapsible-nav-dropdown">
                    <NavDropdown.Item 
                    onClick={()=>navigate(RoutesNames.KORISNIK_PREGLED)}
                    >Korisnici</NavDropdown.Item>
                     <NavDropdown.Item 
                  onClick={()=>navigate(RoutesNames.STAVKA_PREGLED)}
                  >
                    Stavke
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                  onClick={()=>navigate(RoutesNames.TRETMAN_PREGLED)}
                  >
                    Tretmani
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item 
                  onClick={()=>navigate(RoutesNames.USLUGA_PREGLED)}
                  >
                    Usluge
                  </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}