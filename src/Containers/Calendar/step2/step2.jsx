import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card, Form } from 'react-bootstrap';
import './step2.css';

function Step2({ nextStep, previousStep }) {
    return (
        <div>
            <div className="registerPatientContainer">
                <Card className="cardRegister">
                    <Card.Header>
                        <div className="titleRegisterP">
                            <span>Ingresa los datos del paciente</span>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa los nombres"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa los apellidos"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Ingresa la fecha de nacimiento"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Genero</Form.Label>
                                <Form.Select
                                    aria-label="Selecciona el genero"
                                    name="genere">
                                    <option value="">Selecciona el genero</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Motivo de la consulta</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ingresa el motivo de la consulta"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Diagnosticos</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ingresa los diagnosticos"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Atentciones actuales</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ingresa las atenciones profesionales actuales"
                                />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="buttonDiv">
                    <div className="buttonContainer">
                        <Button
                            className="buttonVolverContinuar"
                            onClick={previousStep}>
                            Volver
                        </Button>
                    </div>
                    <div className="buttonContainer">
                        <Button className="buttonVolverContinuar" onClick={nextStep}>
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
