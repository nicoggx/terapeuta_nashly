import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './step1.css';
import { useDispatch } from 'react-redux';
import { selectTypeSession } from '../../../modules/session/sessionModule';

function Step1({ nextStep }) {
    const dispatch = useDispatch();

    const handleSelectTypeAtt = (type) => {
        dispatch(selectTypeSession(type));
    };

    return (
        <div>
            <h1>¿Que incluye la atención de Terapia ocupacional a domicilio?</h1>
            <div className="containerStep1">
                <div>
                    <div>
                        <Card className="cardOne">
                            <Card.Header>
                                Evaluación de Terapia ocupacional
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="titlePrimera">
                                    Si es tu primera atención, debes seleccionar esta
                                    opción
                                </Card.Title>
                                <Card.Subtitle>Esto incluye:</Card.Subtitle>
                                <Card.Text>
                                    - Entrevista semi-estructurada con cuidador/a
                                    principal.
                                </Card.Text>
                                <Card.Text>
                                    - Aplicación de pautas estandarizadas.
                                </Card.Text>
                                <Card.Text>
                                    - Análisis y evaluación mediante juego libre con
                                    el usuario/a.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <div className="buttonContainer">
                            <Button
                                className="buttonSeleccionar"
                                onClick={() => {
                                    nextStep();
                                    handleSelectTypeAtt(1);
                                }}>
                                Seleccionar
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <Card className="cardTwo">
                            <Card.Header>
                                Intervención de Terapia ocupacional
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle>Esto incluye:</Card.Subtitle>
                                <Card.Text>
                                    <span>- Diagnostico ocupacional</span>
                                </Card.Text>
                                <Card.Text>
                                    <span>
                                        - Abordaje de las principales problematicas
                                        ocupacionales.
                                    </span>
                                </Card.Text>
                                <Card.Text>
                                    - Informes y re-evaluaciones de Terapia
                                    ocupacional.
                                </Card.Text>
                                <Card.Text>
                                    - Indicaciones de actividades a trabajar en casa.
                                </Card.Text>
                                <Card.Text>
                                    - Estrategia y actividades a problemas comunes en
                                    la escuela.
                                </Card.Text>
                                <Card.Text>- Dieta sensorial.</Card.Text>
                                <Card.Text>- Abordaje familiar.</Card.Text>
                            </Card.Body>
                        </Card>
                        <div className="buttonContainer">
                            <Button
                                className="buttonSeleccionar"
                                onClick={() => {
                                    nextStep();
                                    handleSelectTypeAtt(2);
                                }}>
                                Seleccionar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Step1.defaultProps = {
    nextStep: () => {},
};

Step1.propTypes = {
    nextStep: PropTypes.func,
};

export default Step1;
