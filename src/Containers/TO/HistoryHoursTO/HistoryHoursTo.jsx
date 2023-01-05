import './HistoryHoursTo.css';
import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistorySession } from '../../../modules/session/sessionModule';
import { formatDate } from '../../../util/user';
import { getTypeSession } from '../../../util/sessions';

function HistoryHoursTo() {
    const dispatch = useDispatch();
    const { sessionHistory } = useSelector((state) => state.sessions);
    useEffect(() => {
        dispatch(getHistorySession(0));
    }, [dispatch]);

    console.log('sessionHistory ', sessionHistory);
    return (
        <div className="historyHoursContainer">
            <h1>Historial</h1>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Fecha sesión</th>
                            <th>Paciente</th>
                            <th>Estado</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {sessionHistory.map((s) => (
                            <tr>
                                <td>{formatDate(s.dateSession)}</td>
                                <td>
                                    {s.name !== null
                                        ? `${s.name} ${s.lastName}`
                                        : ''}
                                </td>
                                <td>{getTypeSession(s.state)}</td>
                                <td>Ver</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default HistoryHoursTo;
