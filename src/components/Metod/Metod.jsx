import { Card } from 'react-bootstrap';
import { BsClipboardCheck, BsFillSuitHeartFill } from 'react-icons/bs';
import { RiFileList3Line } from 'react-icons/ri';
import { MdDateRange } from 'react-icons/md';

import './Metod.css';

function Metod() {
    return (
        <div>
            <div>
                <h2>Metodologia de trabajo</h2>
            </div>
            <div className="cards">
                <div className="divCard">
                    <Card className="card">
                        <div className="iconCard">
                            <BsClipboardCheck size="60" />
                        </div>
                        <Card.Title>Evaluación</Card.Title>
                        <Card.Text>
                            Se realiza la evaluación correspondiente al paciente ya
                            sea prescencial o remoto
                        </Card.Text>
                    </Card>
                </div>
                <div className="divCard">
                    <Card className="card">
                        <div className="iconCard">
                            <RiFileList3Line size="60" />
                        </div>
                        <Card.Title>Informe</Card.Title>
                        <Card.Text>
                            Se entrega un informe detallado sobre el paciente y la
                            intervención requerida.
                        </Card.Text>
                    </Card>
                </div>
                <div className="divCard">
                    <Card className="card">
                        <div className="iconCard">
                            <MdDateRange size="60" />
                        </div>
                        <Card.Title>Intervención</Card.Title>
                        <Card.Text>
                            Se realizan sesiones semanalmente segun lo planteado en
                            el informe y las necesidades del paciente.
                        </Card.Text>
                    </Card>
                </div>
                <div className="divCard">
                    <Card className="card">
                        <div className="iconCard">
                            <BsFillSuitHeartFill size="60" />
                        </div>
                        <Card.Title>Acompañamiento</Card.Title>
                        <Card.Text>
                            Se realiza un acompañamiento al paciente a nivel familiar
                            y vida cotidiana.
                        </Card.Text>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Metod;
