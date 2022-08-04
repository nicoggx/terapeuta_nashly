import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../util/auth';
// eslint-disable-next-line import/named
import { logOutAction } from '../../modules/auth/authModule';
import logo from '../../assets/logo.png';
import './Navcomp.css';

function Navcomp() {
    const history = useHistory();
    const { authenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOutAction());
        logOut();
        history.push('/login');
    };

    return (
        <Navbar className="color-nav" expand="lg" variant="light">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/agenda">Agenda tu hora</Nav.Link>
                        <Nav.Link>Servicios</Nav.Link>
                        <Nav.Link>Acerca de mi</Nav.Link>
                        <Nav.Link>Contactame</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {authenticated && (
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={user.info.name} id="basic-nav-dropdown">
                            <NavDropdown.Item disabled>
                                <div className="divLogo">
                                    <img src={logo} className="logo" alt="logo" />
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">
                                Perfil
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Ayuda
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogOut}>
                                Cerrar sesión
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                )}
                {!authenticated && (
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown.Item href="/login">
                            Iniciar sesión
                        </NavDropdown.Item>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
}

export default Navcomp;
