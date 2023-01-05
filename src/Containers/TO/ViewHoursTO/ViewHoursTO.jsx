import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Table } from 'react-bootstrap';
import {
    getScheduleSessions,
    setAlert,
} from '../../../modules/session/sessionModule';
import { formatDate, hourConvert } from '../../../util/user';
import './ViewHours.css';
import { updateStateSession } from '../../../service/session/sessions';

function ViewHoursTO() {
    const dispatch = useDispatch();
    const { scheduleSessiones } = useSelector((state) => state.sessions);
    const [showInfoSession, setShowSession] = useState(false);
    const [sessionSelected, setSession] = useState({});

    useEffect(() => {
        dispatch(getScheduleSessions());
    }, [dispatch]);

    const handleShowSession = (session) => {
        setShowSession(true);
        setSession(session);
    };

    const handleSessionOk = async () => {
        if (showInfoSession) {
            const request = {
                state: 6,
                sessionId: sessionSelected.id,
            };
            try {
                const { data: response, status } = await updateStateSession(request);
                if (response && status === 200) {
                    setShowSession(false);
                    dispatch(
                        setAlert(
                            'success',
                            'Se ha cambiado el estado de la sesión',
                            '',
                        ),
                    );
                }
            } catch (e) {
                dispatch(
                    setAlert(
                        'danger',
                        'Ha ocurrido un error al cambiar la sesión',
                        '',
                    ),
                );
            }
        }
    };

    return (
        <div className="viewHourTOContainer">
            <h1>Horas agendadas</h1>
            {scheduleSessiones.length > 0 && (
                <div className="scheduleContainer">
                    {scheduleSessiones.map((s) => (
                        <div className="cardSchedule">
                            <Button
                                className="buttonSchedule"
                                onClick={() => {
                                    handleShowSession(s);
                                }}>
                                Fecha: {formatDate(s.dateSession)} <br />
                                Hora: {hourConvert(s.hourSession)}
                            </Button>
                        </div>
                    ))}
                </div>
            )}
            {scheduleSessiones.length === 0 && (
                <div>
                    <h2>No hay horas agendadas</h2>
                </div>
            )}
            <Modal
                size="lg"
                show={showInfoSession}
                onHide={() => setShowSession(false)}
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Información sesión
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td>Nombre paciente</td>
                                <td>
                                    {sessionSelected.patientName}{' '}
                                    {sessionSelected.patientLast}
                                </td>
                            </tr>
                            <tr>
                                <td>Nombre cuidador</td>
                                <td>
                                    {sessionSelected.name} {sessionSelected.lastName}
                                </td>
                            </tr>
                            <tr>
                                <td>Edad paciente</td>
                                <td>
                                    {moment().diff(
                                        moment(sessionSelected.birthday),
                                        'years',
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Dirección</td>
                                <td>{sessionSelected.address}</td>
                            </tr>
                            <tr>
                                <td>Comuna</td>
                                <td>{sessionSelected.city}</td>
                            </tr>
                            <tr>
                                <td>Previsión</td>
                                <td>{sessionSelected.methodHealth}</td>
                            </tr>
                            <tr>
                                <td>Telefono</td>
                                <td>{sessionSelected.phone}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={handleSessionOk}>Sesión Realizada</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ViewHoursTO;
