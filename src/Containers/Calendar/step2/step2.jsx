import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card, Form } from 'react-bootstrap';
import './step2.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setInfoPatientRedux,
    setPatientSelected,
} from '../../../modules/session/sessionModule';
import { formatRut } from '../../../util/user';

function Step2({ nextStep, previousStep }) {
    const [infoPatient, setInfoPatient] = useState({
        name: '',
        lastname: '',
        birthday: '',
        genere: '',
        password: '',
        reasonConsultation: '',
        diagnostics: '',
        currentCare: '',
        rut: '',
    });

    const [patientSelect, setPatientSelect] = useState(0);
    const [errorPatientSelected, setErrorPatientSelected] = useState(false);

    const [errorinfoPatient, setErrorinfoPatient] = useState({
        errorName: false,
        errorLastname: false,
        errorBirthday: false,
        errorGenere: false,
        errorReason: false,
        errorDiagnostics: false,
        errorCurrentCare: false,
        errorRut: false,
    });

    const dispatch = useDispatch();

    const { typeSessionSelected, patients } = useSelector((state) => state.sessions);

    useEffect(() => {
        setErrorinfoPatient({
            errorName: false,
            errorLastname: false,
            errorBirthday: false,
            errorGenere: false,
            errorReason: false,
            errorDiagnostics: false,
            errorCurrentCare: false,
            errorRut: false,
        });
        if (!typeSessionSelected || typeSessionSelected === 0) {
            previousStep();
        }
    }, [previousStep, setInfoPatient, typeSessionSelected]);

    const handleBack = () => {
        setErrorinfoPatient({
            errorName: false,
            errorLastname: false,
            errorBirthday: false,
            errorGenere: false,
            errorReason: false,
            errorDiagnostics: false,
            errorCurrentCare: false,
            errorRut: false,
        });
        previousStep();
    };

    const handleChange = (event) => {
        setErrorinfoPatient({
            errorName: false,
            errorLastname: false,
            errorBirthday: false,
            errorGenere: false,
            errorReason: false,
            errorDiagnostics: false,
            errorCurrentCare: false,
            errorRut: false,
        });
        const { value, name } = event.target;
        let val = value;
        if (name === 'rut') {
            val = formatRut(value);
        }
        const inf = { ...infoPatient, [name]: val };
        setInfoPatient(inf);
    };

    const handleSelectPatient = (event) => {
        setErrorPatientSelected(false);
        const { value } = event.target;
        setPatientSelect(parseInt(value, 10));
        dispatch(setPatientSelected(parseInt(value, 10)));
    };

    const validateForm = () => {
        let validate = true;
        const rut = infoPatient.rut.replaceAll('.', '');

        const initial = {
            errorName: false,
            errorLastname: false,
            errorBirthday: false,
            errorGenere: false,
            errorReason: false,
            errorDiagnostics: false,
            errorCurrentCare: false,
            errorRut: false,
        };

        if (infoPatient.name === '') {
            validate = false;
            initial.errorName = true;
        }

        if (infoPatient.lastname === '') {
            validate = false;
            initial.errorLastname = true;
        }
        if (infoPatient.genere === '') {
            validate = false;
            initial.errorGenere = true;
        }
        if (infoPatient.birthday === '') {
            validate = false;
            initial.errorBirthday = true;
        }
        if (typeSessionSelected === 1) {
            if (infoPatient.reasonConsultation === '') {
                validate = false;
                initial.errorReason = true;
            }
        }

        if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
            validate = false;
            initial.errorRut = true;
        }

        setErrorinfoPatient(initial);

        return validate;
    };

    const handleSavePacient = () => {
        if (patients.length > 0) {
            if (patientSelect !== 0) {
                dispatch(setInfoPatientRedux(infoPatient));
                nextStep();
            } else {
                setErrorPatientSelected(true);
            }
        }

        if (validateForm()) {
            dispatch(setInfoPatientRedux(infoPatient));
            nextStep();
        }
    };

    const cardSize = () => {
        if (patients.length > 0) {
            return 'cardRegisterType3';
        }
        if (typeSessionSelected === 1) {
            return 'cardRegisterType1';
        }

        return 'cardRegisterType2';
    };

    return (
        <div>
            <div className="registerPatientContainer">
                <Card className={cardSize()}>
                    <Card.Header>
                        <div className="titleRegisterP">
                            <span>Ingresa los datos del paciente</span>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {patients.length === 0 && (
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombres</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={infoPatient.name}
                                        name="name"
                                        placeholder="Ingresa los nombres"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {errorinfoPatient.errorName && (
                                        <span className="spanError">
                                            Debes ingresar un nombre
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control
                                        value={infoPatient.lastname}
                                        name="lastname"
                                        onChange={(e) => handleChange(e)}
                                        type="text"
                                        placeholder="Ingresa los apellidos"
                                    />
                                    {errorinfoPatient.errorLastname && (
                                        <span className="spanError">
                                            Debes ingresar los apellido
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rut</Form.Label>
                                    <Form.Control
                                        value={infoPatient.rut}
                                        name="rut"
                                        onChange={(e) => handleChange(e)}
                                        type="text"
                                        placeholder="Ingresa un rut"
                                    />
                                    {errorinfoPatient.errorRut && (
                                        <span className="spanError">
                                            Debes ingresar un rut valido
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={infoPatient.birthday}
                                        name="birthday"
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Ingresa la fecha de nacimiento"
                                    />
                                    {errorinfoPatient.errorBirthday && (
                                        <span className="spanError">
                                            Debes ingresar la fecha de nacimiento
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Genero</Form.Label>
                                    <Form.Select
                                        aria-label="Selecciona el genero"
                                        value={infoPatient.genere}
                                        onChange={(e) => handleChange(e)}
                                        name="genere">
                                        <option value="">
                                            Selecciona el genero
                                        </option>
                                        <option value="1">Masculino</option>
                                        <option value="2">Femenino</option>
                                        <option value="3">Otro</option>
                                    </Form.Select>
                                    {errorinfoPatient.errorGenere && (
                                        <span className="spanError">
                                            Debes ingresar seleccionar un genero
                                        </span>
                                    )}
                                </Form.Group>
                                {typeSessionSelected === 1 && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Motivo de la consulta
                                        </Form.Label>
                                        <Form.Control
                                            value={infoPatient.reasonConsultation}
                                            name="reasonConsultation"
                                            onChange={(e) => handleChange(e)}
                                            as="textarea"
                                            placeholder="Ingresa el motivo de la consulta"
                                        />
                                        {errorinfoPatient.errorDiagnostics && (
                                            <span className="spanError">
                                                Debes ingresar el motivo de la
                                                consulta
                                            </span>
                                        )}
                                    </Form.Group>
                                )}
                                {typeSessionSelected === 1 && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Diagnosticos</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            value={infoPatient.diagnostics}
                                            name="diagnostics"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="Ingresa los diagnosticos"
                                        />
                                    </Form.Group>
                                )}
                                {typeSessionSelected === 1 && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Atenciones actuales</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            value={infoPatient.currentCare}
                                            name="currentCare"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="Ingresa las atenciones
                                            profesionales actuales"
                                        />
                                    </Form.Group>
                                )}
                            </Form>
                        )}
                        {patients.length > 0 && (
                            <div>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Seleccione el paciente que recibira la
                                            atencion
                                        </Form.Label>
                                        <Form.Select
                                            aria-label="Selecciona un paciente"
                                            value={patientSelect}
                                            onChange={(e) => handleSelectPatient(e)}
                                            name="patientSelect">
                                            <option value="0">
                                                Seleccione un paciente
                                            </option>
                                            {patients.map((e) => (
                                                <option value={e.idPatient}>
                                                    {e.name} {e.lastName} Rut:{' '}
                                                    {formatRut(e.rut)}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {errorPatientSelected && (
                                            <span className="spanError">
                                                Debes seleccionar una paciente
                                            </span>
                                        )}
                                    </Form.Group>
                                </Form>
                            </div>
                        )}
                    </Card.Body>
                </Card>
                <div className="buttonDiv">
                    <div className="buttonContainer">
                        <Button
                            className="buttonVolverContinuar"
                            onClick={handleBack}>
                            Volver
                        </Button>
                    </div>
                    <div className="buttonContainer">
                        <Button
                            className="buttonVolverContinuar"
                            onClick={() => {
                                handleSavePacient();
                            }}>
                            Continuar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Step2.defaultProps = {
    nextStep: () => {},
    previousStep: () => {},
};

Step2.propTypes = {
    nextStep: PropTypes.func,
    previousStep: PropTypes.func,
};

export default Step2;
