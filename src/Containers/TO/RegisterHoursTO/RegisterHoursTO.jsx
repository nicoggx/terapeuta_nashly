import moment from 'moment';
import 'moment/locale/es';
import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import './RegisterHoursTO.css';
import TimePicker from 'react-bootstrap-time-picker';
import { timeFromInt } from 'time-number';
import { useDispatch } from 'react-redux';
import { createHours, getHoursCreates } from '../../../service/session/sessions';
import {
    activateLoadingSession,
    desactiveLoadingSession,
} from '../../../modules/session/sessionModule';
import { getTypeSession } from '../../../util/sessions';

moment.locale('es', {
    week: {
        dow: 6,
    },
});

function RegisterHoursT() {
    const dispatch = useDispatch();
    const [firstDayWeek, setFirstDayWeek] = useState('');
    const [lastDayWeek, setLastDayWeek] = useState('');
    const [activeNextWeek, setActiveNextWeek] = useState(true);
    const [days, setDays] = useState([]);
    const [daySelect, setDaySelect] = useState('');
    const [initHour, setInitHour] = useState(32400);
    const [hours, setHours] = useState([]);
    const [hoursData, setHoursData] = useState([]);
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [errorCreateH, setErrorCreate] = useState(false);
    const [successCreate, setSuccessCreate] = useState(false);

    const clearStates = () => {
        setHours([]);
        setHoursData([]);
        setMessageError('');
        setError(false);
        setInitHour(32400);
    };

    const selectedNextWeekBtn = () => {
        clearStates();
        const now = moment();
        const daysArray = [];
        for (let count = 0; count < 7; count += 1) {
            const nextWeek = moment().add(1, 'weeks').startOf('isoWeek');
            const obj = {
                day: nextWeek.add(count, 'days').format('DD-MM-YYYY'),
                dayName: nextWeek.format('dddd'),
                hours: [],
            };
            daysArray.push(obj);
        }
        setDays(daysArray);
        setFirstDayWeek(now.add(1, 'weeks').startOf('week').format('DD-MM-YYYY'));
        setLastDayWeek(now.add(1, 'weeks').endOf('week').format('DD-MM-YYYY'));
        setActiveNextWeek(true);
    };

    const selectedNowWeekBtn = () => {
        clearStates();
        setDaySelect('');
        const now = moment();
        const daysArray = [];
        for (let count = 0; count < 7; count += 1) {
            const week = moment().startOf('isoWeek');
            const obj = {
                day: week.add(count, 'days').format('DD-MM-YYYY'),
                dayName: week.format('dddd'),
                hours: [],
            };
            daysArray.push(obj);
        }
        setDays(daysArray);
        setFirstDayWeek(now.clone().startOf('week').format('DD-MM-YYYY'));
        setLastDayWeek(now.clone().endOf('week').format('DD-MM-YYYY'));
        setActiveNextWeek(false);
    };

    const handleChangeHourInit = (time) => {
        setError(false);
        setInitHour(time);
    };

    const handleSelectDay = async (day) => {
        dispatch(activateLoadingSession('Obteniendo información.'));
        clearStates();
        setDaySelect('');
        setErrorCreate(false);
        setSuccessCreate(false);
        const { data: response } = await getHoursCreates(
            moment(day, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        );
        if (response) {
            if (response.response) {
                const arrayH = [];
                response.response.forEach((m) => {
                    const obj = {};
                    obj.hour = moment(m.hourSession).utc().format('HH:mm');
                    obj.state = getTypeSession(m.state);
                    arrayH.push(obj);
                });
                setHoursData([...arrayH]);
            }
        }
        setDaySelect(day);
        dispatch(desactiveLoadingSession());
    };

    const validateCreateHour = () => {
        let validate = true;
        const findHour = hours.filter((d) => {
            return d.init === `${timeFromInt(initHour)}:00`;
        });

        if (findHour.length > 0) {
            setMessageError('No puede crear las mismas horas');
            setError(true);
            validate = false;
        }

        const findHourData = hoursData.filter((d) => {
            return d.hour === `${timeFromInt(initHour)}`;
        });
        if (findHourData.length > 0) {
            setMessageError('No puede crear una hora ya creada para esta fecha');
            setError(true);
            validate = false;
        }

        return validate;
    };

    const handleCreateHour = () => {
        if (validateCreateHour()) {
            const arrayHours = hours;
            arrayHours.push({
                init: `${timeFromInt(initHour)}:00`,
            });
            setHours([...arrayHours]);
        }
    };

    const handleCreateHours = async () => {
        if (hours.length > 0) {
            const request = {
                day: moment(daySelect, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                hours,
            };
            const { data: response, status } = await createHours(request);
            if (response) {
                if (status === 200) {
                    setSuccessCreate(true);
                    clearStates();
                    setDaySelect('');
                    setTimeout(() => {
                        setSuccessCreate(false);
                    }, 15000);
                } else {
                    setErrorCreate(true);
                }
            } else {
                setErrorCreate(true);
            }
        }
    };

    const handleClearHours = () => {
        setHours([]);
    };

    return (
        <div className="registerHoursContainer">
            <div className="registerHoursContainerSub">
                <h1>Registrar horas</h1>
                <div className="selectWeekContainer">
                    {!activeNextWeek && (
                        <div>
                            <Button
                                className="buttonSelectWeek"
                                onClick={selectedNextWeekBtn}>
                                Próxima semana
                            </Button>
                        </div>
                    )}
                    {activeNextWeek && (
                        <div>
                            <Button
                                className="buttonSelectWeek"
                                onClick={selectedNowWeekBtn}>
                                Semana actual
                            </Button>
                        </div>
                    )}
                </div>
                {firstDayWeek !== '' && (
                    <h1>
                        Semana del {firstDayWeek} al {lastDayWeek}
                    </h1>
                )}
                {days.length > 0 && (
                    <div className="selectionDaySpan">
                        <span>Seleccione un dia</span>
                    </div>
                )}
                <div className="calendarWeek">
                    {days.map((d, i) => (
                        <div key={i}>
                            <Button
                                onClick={() => {
                                    handleSelectDay(d.day);
                                }}
                                className={
                                    daySelect === d.day
                                        ? 'buttonDaySelected'
                                        : 'buttonDay'
                                }>
                                <span>{d.dayName}</span>
                                <br />
                                {d.day}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            {daySelect !== '' && (
                <div className="selectionDaySpan">
                    <div className="daySelectContainer">
                        <span>{daySelect}</span>
                    </div>
                    <div className="hoursCreate">
                        <div className="hoursCreateContainer">
                            <div>
                                <div className="hourSelected">
                                    <span>Hora: </span>
                                    <TimePicker
                                        start="09:00"
                                        end="21:00"
                                        format={24}
                                        step={30}
                                        onChange={handleChangeHourInit}
                                        value={initHour}
                                    />
                                </div>
                                <div>
                                    <Button
                                        className="buttonCreate"
                                        onClick={handleCreateHour}>
                                        Crear hora
                                    </Button>
                                    <Button
                                        className="buttonCreate"
                                        onClick={handleClearHours}>
                                        Limpiar horas
                                    </Button>
                                </div>
                                {error && (
                                    <span className="spanError">{messageError}</span>
                                )}
                            </div>
                        </div>
                        {hours.length > 0 && (
                            <div className="hoursView">
                                <span>Horas a crear: </span>
                                <div>
                                    {hours.map((dd) => (
                                        <div className="hourInitEnd">{dd.init}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {hoursData.length > 0 && (
                            <div className="hoursView">
                                <span>Horas creadas: </span>
                                <div>
                                    {hoursData.map((dd) => (
                                        <div>
                                            <div
                                                className={`hourData ${
                                                    dd.state === 'Disponible'
                                                        ? 'hourAvalible'
                                                        : 'hourProgrammed'
                                                }`}>
                                                {dd.hour}:00
                                                <br />
                                                <span>Estado: {dd.state}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="registerHoursContainerSub2">
                        <Button className="buttonCreate" onClick={handleCreateHours}>
                            Guardar horas
                        </Button>
                    </div>
                </div>
            )}
            {errorCreateH && (
                <div className="containerAlert">
                    <Alert
                        variant="danger"
                        onClose={() => setErrorCreate(false)}
                        dismissible>
                        <Alert.Heading>
                            Ha ocurrido un error al crear las horas
                        </Alert.Heading>
                        <p>Intente nuevamente</p>
                    </Alert>
                </div>
            )}
            {successCreate && (
                <div className="containerAlert">
                    <Alert
                        variant="success"
                        onClose={() => setSuccessCreate(false)}
                        dismissible>
                        <Alert.Heading>
                            ¡Se han creado correctamente las horas !
                        </Alert.Heading>
                    </Alert>
                </div>
            )}
        </div>
    );
}

export default RegisterHoursT;
