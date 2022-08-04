import { FcAlarmClock } from 'react-icons/fc';
import { Button } from 'react-bootstrap';
import './Main.css';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import terapia from '../../assets/terapia.jpeg';
import adultomayor from '../../assets/adultomayor.jpeg';
import Metod from '../Metod/Metod';

function Main() {
    const history = useHistory();

    const handleGoToAgenda = () => {
        history.push('/agenda');
    };

    return (
        <div className="main">
            <div>
                <div>
                    <Button onClick={handleGoToAgenda} className="buttonAgenda">
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
                        <h2>En niños:</h2>
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
                        <img
                            className="imgMiddle"
                            src={adultomayor}
                            alt="adultomayor"
                        />
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
            <div className="mainAbout">
                <div>
                    <div>
                        <BsFillSuitHeartFill size="100" />
                    </div>
                    <h2>Hola, soy Nashly Paine y estoy aqui para ayudarte</h2>
                    <div className="divAbout">
                        <div className="textAbout">
                            <span>
                                Desde muy temprano en mi formación como Terapeuta
                                Ocupacional soñé con poder fundar un lugar acogedor,
                                en donde las mamás y papás no solo asistan de manera
                                semanal a una sesión en particular, si no, que en
                                cada acción puedan sentir el apoyo en torno a las
                                mejoras de sus hijos.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divMetod">
                <Metod />
            </div>
        </div>
    );
}

export default Main;
