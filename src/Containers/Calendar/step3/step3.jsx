import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Alert, Card } from 'react-bootstrap';
import './step3.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    activateLoadingSession,
    desactiveLoadingSession,
    getSessionsHoursDispatch,
} from '../../../modules/session/sessionModule';
import { formatDate, formatDateTwo, hourConvert } from '../../../util/user';
import { createSession, getHoursForDate } from '../../../service/session/sessions';

function Step3({ nextStep, previousStep }) {
    const dispatch = useDispatch();
    const { sessions, infoPatient, typeSessionSelected, pacienteSelected } =
        useSelector((state) => state.sessions);
    const { user } = useSelector((state) => state.auth);
    const [hours, setHours] = useState([]);
    const [errorHours, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hourSelect, setHourSelect] = useState(0);
    const [hourDate, setHourDate] = useState('');
    const [daySelect, setDaySelect] = useState('');
    const [sessionOk, setSessionOK] = useState(false);

    useEffect(() => {
        dispatch(activateLoadingSession('Cargando dias con sesiones disponibles.'));
        dispatch(getSessionsHoursDispatch());
        setDaySelect('');
        setHours([]);
        dispatch(desactiveLoadingSession());
    }, [dispatch]);

    async function handleGetHours(date) {
        setDaySelect(date);
        setHours([]);
        setShowAlert(false);
        dispatch(activateLoadingSession('Cargando horas para el dia seleccionado.'));
        try {
            const { data: response } = await getHoursForDate(date);
            if (response) {
                setHours(response.response);
            } else {
                setShowAlert(true);
                setErrorMessage(
                    'No hay horas disponibles para el dia seleccionado.',
                );
            }
        } catch (e) {
            setShowAlert(true);
            setErrorMessage('No hay horas disponibles para el dia seleccionado.');
        }

        dispatch(desactiveLoadingSession());
    }

    const handleBack = () => {
        setShowAlert(false);
        setHours([]);
        setErrorMessage('');
        setDaySelect('');
        previousStep();
    };

    const handleSelectHour = (hour) => {
        setHourSelect(hour.id);
        setHourDate(hourConvert(hour.hourSession));
    };

    const handleRegisterSession = async () => {
        dispatch(activateLoadingSession('Agendando sesión...'));
        const response = {
            infoPatient,
            typeSessionSelected,
        };
        try {
            const request = {
                idSession: hourSelect,
                date: daySelect,
                userInfo: user.info,
                userId: user.id,
                hour: hourDate,
                patientId: pacienteSelected,
                infoPatient: {
                    name: infoPatient.name,
                    lastname: infoPatient.lastname,
                    birthday: infoPatient.birthday,
                    genere: infoPatient.genere,
                    reasonConsultation: infoPatient.reasonConsultation,
                    diagnostics: infoPatient.diagnostics,
                    currentCare: infoPatient.currentCare,
                    rut: infoPatient.rut.replaceAll('.', '').replaceAll('-', ''),
                },
                typeSessionSelected,
            };
            await createSession(request);
            setSessionOK(true);
        } catch (e) {
            setShowAlert(true);
            setErrorMessage(
                'Hubo un error al agendar la sesión. Intente nuevamente',
            );
        }
        dispatch(desactiveLoadingSession());
        if (!response) {
            nextStep();
        }
    };

    return (
        <div>
            {!sessionOk && (
                <div>
                    <div className="subContainerCard">
                        <Card className="cardFecha">
                            <Card.Header>Selecciona una fecha</Card.Header>
                            <Card.Body className="cardFechaBody">
                                <div className="fechasContainer">
                                    {sessions.map((d, index) => (
                                        <div key={index} className="fechaContainer">
                                            <Button
                                                className={
                                                    formatDateTwo(d.dateSession) ===
                                                    daySelect
                                                        ? 'btnFechaActive'
                                                        : 'btnFecha'
                                                }
                                                id={index}
                                                onClick={() => {
                                                    handleGetHours(
                                                        formatDateTwo(d.dateSession),
                                                    );
                                                }}>
                                                {formatDate(d.dateSession)}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    {hours.length > 0 && (
                        <div>
                            <Card className="cardHoras">
                                <Card.Header>Seleccione una hora</Card.Header>
                                <Card.Body className="cardFechaBody">
                                    <div className="fechasContainer">
                                        {hours.map((m) => (
                                            <div
                                                key={m.id}
                                                className="fechaContainer">
                                                <Button
                                                    className={
                                                        m.id === hourSelect
                                                            ? 'btnFechaActive'
                                                            : 'btnFecha'
                                                    }
                                                    id={m.id}
                                                    onClick={() => {
                                                        handleSelectHour(m);
                                                    }}>
                                                    {hourConvert(m.hourSession)}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                    {errorHours && (
                        <div className="containerAlert">
                            <Alert
                                variant="danger"
                                onClose={() => setShowAlert(false)}
                                dismissible>
                                <Alert.Heading>
                                    Ha ocurrido un error al consultar horas
                                    disponibles
                                </Alert.Heading>
                                <p>{errorMessage}</p>
                            </Alert>
                        </div>
                    )}
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
                                className="buttonRegisterSession"
                                disabled={hourSelect === 0}
                                onClick={handleRegisterSession}>
                                Agendar sesión
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {sessionOk && (
                <div className="containerAlert">
                    <Alert
                        variant="success"
                        onClose={() => setSessionOK(false)}
                        dismissible>
                        <Alert.Heading>
                            Sesión agendada correctamente !
                        </Alert.Heading>
                    </Alert>
                </div>
            )}
        </div>
    );
}

Step3.defaultProps = {
    nextStep: () => {},
    previousStep: () => {},
};

Step3.propTypes = {
    nextStep: PropTypes.func,
    previousStep: PropTypes.func,
};

export default Step3;
