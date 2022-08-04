import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import './step3.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionsHoursDispatch } from '../../../modules/session/sessionModule';
import { formatDate, formatDateTwo, hourConvert } from '../../../util/user';
import { getHoursForDate } from '../../../service/session/sessions';

function Step3({ nextStep, previousStep }) {
    const dispatch = useDispatch();
    const { sessions } = useSelector((state) => state.sessions);
    const [hours, setHours] = useState([]);

    useEffect(() => {
        dispatch(getSessionsHoursDispatch());
    }, [dispatch]);

    async function handleGetHours(date) {
        const { data: response } = await getHoursForDate(date);
        if (response) {
            setHours(response.response);
        }
    }

    return (
        <div>
            <div className="subContainerCard">
                <Card className="cardFecha">
                    <Card.Header>Selecciona una fecha</Card.Header>
                    <Card.Body>
                        <div className="fechasContainer">
                            {sessions.map((m, index) => (
                                <div key={index} className="fechaContainer">
                                    <Button
                                        className="btnFecha"
                                        onClick={() => {
                                            handleGetHours(
                                                formatDateTwo(m.dateSession),
                                            );
                                        }}>
                                        {formatDate(m.dateSession)}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <Card className="cardHoras">
                    <Card.Header>Seleccione una hora</Card.Header>
                    <Card.Body>
                        <div className="fechasContainer">
                            {hours.map((m) => (
                                <div key={m.id} className="fechaContainer">
                                    <Button
                                        className="btnFecha"
                                        onClick={() => {
                                            handleGetHours(m.id);
                                        }}>
                                        {hourConvert(m.hourSession)}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="buttonDiv">
                <div className="buttonContainer">
                    <Button className="buttonVolverContinuar" onClick={previousStep}>
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
