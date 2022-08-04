import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function StepTwoRegister({
    nextStep,
    info,
    setInfoUser,
    errorInfoUser,
    setErrorInfoUser,
}) {
    const handleChange = (event) => {
        setErrorInfoUser({
            errorName: false,
            errorLastname: false,
            errorRut: false,
            errorBirthday: false,
            errorEmail: false,
            errorPassword: false,
            errorAddress: false,
            errorCity: false,
            errorHealth: false,
            errorPhone: false,
            errorPasswordDiferents: false,
            errorRepeatPassword: false,
        });
        const { value, name } = event.target;
        const inf = { ...info, [name]: value };
        setInfoUser(inf);
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa tu ciudad"
                    value={info.city}
                    name="city"
                    onChange={(e) => handleChange(e)}
                />
                {errorInfoUser.errorCity && (
                    <span className="spanError">Debes ingresar una ciudad</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa tu dirección"
                    value={info.address}
                    name="address"
                    onChange={(e) => handleChange(e)}
                />
                {errorInfoUser.errorAddress && (
                    <span className="spanError">Debes ingresar una dirección</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Numero telefonico</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa tu numero telefonico"
                    value={info.phone}
                    name="phone"
                    onChange={(e) => handleChange(e)}
                />
                {errorInfoUser.errorPhone && (
                    <span className="spanError">
                        Debes ingresar un numero telefónico valido
                    </span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Previsión</Form.Label>
                <Form.Select
                    aria-label="Selecciona tu previsión"
                    value={info.health}
                    name="health"
                    onChange={(e) => handleChange(e)}>
                    <option value="">Selecciona tu previsión</option>
                    <option value="Fonasa">Fonasa</option>
                    <option value="Isapre">Isapre</option>
                </Form.Select>
                {errorInfoUser.errorHealth && (
                    <span className="spanError">
                        Debes seleccionar una previsión
                    </span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={info.password}
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                {errorInfoUser.errorPassword && (
                    <span className="spanError">
                        Debes ingresar una contraseña valida
                    </span>
                )}
                <br />
                <span className="spanInfo">
                    Tu contraseña debe ser de minimo 6 caracteres
                </span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Repetir contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={info.repeatPassword}
                    name="repeatPassword"
                    onChange={(e) => handleChange(e)}
                />
                {errorInfoUser.errorRepeatPassword && (
                    <span className="spanError">Debes repetir contraseña</span>
                )}
                {errorInfoUser.errorPasswordDiferents && (
                    <span className="spanError">
                        Las contraseñas deben ser las mismas
                    </span>
                )}
            </Form.Group>
            <Button
                className="btnIngresar"
                onClick={() => {
                    nextStep({
                        stepOne: true,
                        stepTwo: false,
                        stepThree: false,
                    });
                }}>
                Volver
            </Button>
            <Button
                className="btnIngresar"
                onClick={() => {
                    nextStep({
                        stepOne: false,
                        stepTwo: false,
                        stepThree: true,
                    });
                }}>
                Registrarme
            </Button>
        </Form>
    );
}

StepTwoRegister.defaultProps = {
    nextStep: () => {},
    info: {
        name: '',
    },
};

StepTwoRegister.propTypes = {
    nextStep: PropTypes.func,
    info: PropTypes.shape({
        name: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        rut: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        health: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        repeatPassword: PropTypes.string.isRequired,
    }),
    setInfoUser: PropTypes.func.isRequired,
    errorInfoUser: PropTypes.shape({
        errorName: PropTypes.bool.isRequired,
        errorLastname: PropTypes.bool.isRequired,
        errorRut: PropTypes.bool.isRequired,
        errorBirthday: PropTypes.bool.isRequired,
        errorEmail: PropTypes.bool.isRequired,
        errorPassword: PropTypes.bool.isRequired,
        errorAddress: PropTypes.bool.isRequired,
        errorCity: PropTypes.bool.isRequired,
        errorHealth: PropTypes.bool.isRequired,
        errorPhone: PropTypes.bool.isRequired,
        errorRepeatPassword: PropTypes.bool.isRequired,
        errorPasswordDiferents: PropTypes.bool.isRequired,
    }),
    setErrorInfoUser: PropTypes.func.isRequired,
};

export default StepTwoRegister;
