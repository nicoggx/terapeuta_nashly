import { FcAlarmClock } from 'react-icons/fc';
import { Button } from 'react-bootstrap';
import './Main.css';
import terapia from '../../assets/terapia.jpeg';

function Main() {
    return (
        <div className="main">
            <div>
                <div>
                    <Button className="buttonAgenda">
                        <FcAlarmClock size="50" /> Agenda tu hora
                    </Button>
                </div>
            </div>
            <div className="mainMiddle">
                <div className="textTitl">
                    <h1>La importancia de la Terapia Ocupacional</h1>
                </div>
                <div className="textIntIzq">
                    <div>
                        <h4>En niños:</h4>
                        <span>
                            La terapia ocupacional ayuda a los niños con
                            discapacidades físicas, sensoriales o cognitivas. Los
                            ayuda a llevar a cabo tareas cotidianas, como comer,
                            ponerse los calcetines y los zapatos, centrándose en el
                            aprendizaje, la escritura o en jugar con juguetes o con
                            otros niños.
                        </span>
                    </div>
                    <div>
                        <img className="imgMiddle" src={terapia} alt="ninos" />
                    </div>
                </div>
                <div className="textIntDer">
                    <div>
                        <img className="imgMiddle" src={terapia} alt="ninos" />
                    </div>
                    <div>
                        <h4>En adultos mayores:</h4>
                        <span>
                            Ofrece interesantes posibilidades a la hora de fomentar
                            el envejecimiento activo y promover la independencia o
                            autonomía de las personas mayores en el desempeño de las
                            tareas diarias, para lograr una mayor calidad de vida..
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
