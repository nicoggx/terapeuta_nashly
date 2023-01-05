import { Button, Form } from 'react-bootstrap';
import { RiHealthBookLine } from 'react-icons/ri';
import './Login.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { encrypt } from '../../util/sha512';
import {
    activateLoading,
    authLogin,
    desactiveLoading,
} from '../../modules/auth/authModule';
import { auth } from '../../service/auth/auth';

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.auth);

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (authenticated) {
            history.push('/');
        }
    }, [authenticated, dispatch, history]);

    const handleChange = (event) => {
        const { value, name } = event.target;
        const login = { ...loginInfo, [name]: value };
        setLoginInfo(login);
    };

    const handleGoRegister = () => {
        history.push('/registrar');
    };

    const handleSubmit = async () => {
        dispatch(activateLoading('Iniciando sesion'));
        const request = {
            email: loginInfo.email,
            password: encrypt(loginInfo.password),
        };
        const { data: response, status } = await auth(request);

        if (response) {
            if (status === 200) {
                dispatch(await authLogin(response, status));
                history.push('/agenda');
            }
        }
        dispatch(desactiveLoading());
    };

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <div className="titleLogin">
                    <span>Aun no estoy registrad@</span>
                    <RiHealthBookLine />
                </div>
                <Button className="registrarmeBtn" onClick={handleGoRegister}>
                    Registrarme
                </Button>
            </div>
            <div className="loginForm">
                <div className="titleLogin">
                    <span>Ingresar</span>
                </div>
                <Form className="formLogin">
                    <Form.Group className="mb-10">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            size="lg"
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            size="lg"
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>

                    <Button className="btnIngresar" onClick={handleSubmit}>
                        Ingresar
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
