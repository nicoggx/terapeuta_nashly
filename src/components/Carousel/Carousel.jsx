import { Carousel } from 'react-bootstrap';
import terapia from '../../assets/terapia.jpeg';
import adultomayor from '../../assets/adultomayor.jpeg';
import './Carousel.css';

function Carouselcomp() {
    return (
        <div>
            <Carousel className="divCarousel">
                <Carousel.Item interval={3000}>
                    <img src={terapia} alt="terapia" />
                    <Carousel.Caption>
                        <span className="spantitle">Terapia en niños</span>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img src={adultomayor} alt="adultomayor" />
                    <Carousel.Caption>
                        <span className="spantitle">Terapia en adultos mayores</span>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Carouselcomp;
