import { Carousel } from 'react-bootstrap';
import terapia from '../../assets/terapia.jpeg';
import adultomayor from '../../assets/adultomayor.jpeg';

function Carouselcomp() {
    return (
        <div>
            <Carousel className="divCarousel">
                <Carousel.Item interval={2000}>
                    <img src={terapia} alt="terapia" />
                    <Carousel.Caption>
                        <h3>Terapia en niños</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img src={adultomayor} alt="adultomayor" />
                    <Carousel.Caption>
                        <h3>Terapia en adultos mayores</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Carouselcomp;
