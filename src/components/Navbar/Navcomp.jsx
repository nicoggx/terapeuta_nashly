import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../util/auth';
// eslint-disable-next-line import/named
import { logOutAction } from '../../modules/auth/authModule';
import './Navcomp.css';
import { PACIENT_USER, TO_USER } from '../../constants/user';

function Navcomp() {
    const history = useHistory();
    const { authenticated, user } = useSelector((state) => state.auth);

    const roleUser = () => {
        let role = PACIENT_USER;
        if (user) {
            if (user.role) {
                role = user.role;
            }
        }
        return role;
    };
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
                        {roleUser() === PACIENT_USER && (
                            <Nav.Link href="/agenda">Agenda tu hora</Nav.Link>
                        )}
                        {roleUser() === TO_USER && (
                            <Nav.Link href="/registerHours">
                                Registrar horas disponibles
                            </Nav.Link>
                        )}
                        {roleUser() === TO_USER && (
                            <Nav.Link href="/registrarhoras">
                                Ver horas agendadas
                            </Nav.Link>
                        )}
                        {roleUser() === PACIENT_USER && (
                            <Nav.Link>Servicios</Nav.Link>
                        )}
                        {roleUser() === PACIENT_USER && (
                            <Nav.Link>Acerca de mi</Nav.Link>
                        )}
                        {roleUser() === PACIENT_USER && (
                            <Nav.Link>Contactame</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
                {authenticated && (
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={user.info.name} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.2">
                                Ver horas agendadas
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
