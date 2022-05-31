import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import './Navcomp.css';

function Navcomp() {
    return (
        <Navbar className="color-nav" expand="lg" variant="light">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/agenda">Agenda tu evaluación</Nav.Link>
                        <Nav.Link>Servicios</Nav.Link>
                        <Nav.Link>Acerca de mi</Nav.Link>
                        <Nav.Link>Contactame</Nav.Link>
                        <Nav.Item>
                            <div className="divLogo">
                                <img src={logo} className="logo" alt="logo" />
                            </div>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navcomp;
