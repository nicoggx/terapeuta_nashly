import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './StepOneRegister.css';
import { formatRut } from '../../../util/user';

function StepOneRegister({
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
        });
        const { value, name } = event.target;
        let val = value;
        if (name === 'rut') {
            val = formatRut(value);
        }
        const inf = { ...info, [name]: val };
        setInfoUser(inf);
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                    value={info.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Ingresa tu nombre"
                />
                {errorInfoUser.errorName && (
                    <span className="spanError">Debes ingresar un nombre</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                    value={info.lastname}
                    type="text"
                    placeholder="Ingresa tus apellidos"
                    name="lastname"
                    onChange={(e) => handleChange(e)}
                />
                {errorInfoUser.errorLastname && (
                    <span className="spanError">Debes ingresar un apellido</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Rut</Form.Label>
                <Form.Control
                    value={info.rut}
                    type="text"
                    placeholder="Ingresa tu rut"
                    name="rut"
                    onChange={(e) => handleChange(e)}
                />
                {errorInfoUser.errorRut && (
                    <span className="spanError">Debes ingresar un rut valido</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                    value={info.birthday}
                    type="date"
                    placeholder="Ingresa tu fecha de nacimiento"
                    name="birthday"
                    onChange={(e) => handleChange(e)}
                />
                {errorInfoUser.errorBirthday && (
                    <span className="spanError">
                        Debes ingresar una fecha de nacimiento
                    </span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control
                    value={info.email}
                    type="email"
                    placeholder="Ingresa tu correo electronico"
                    name="email"
                    onChange={(e) => handleChange(e)}
                />
                {errorInfoUser.errorEmail && (
                    <span className="spanError">
                        Debes ingresar un correo valido
                    </span>
                )}
            </Form.Group>
            <Button
                className="btnIngresar"
                onClick={() => {
                    nextStep({
                        stepOne: false,
                        stepTwo: true,
                        stepThree: false,
                    });
                }}>
                Siguiente
            </Button>
        </Form>
    );
}

StepOneRegister.defaultProps = {
    nextStep: () => {},
    info: {
        name: '',
    },
};

StepOneRegister.propTypes = {
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
    }),
    setErrorInfoUser: PropTypes.func.isRequired,
};

export default StepOneRegister;
