import { Carousel } from 'react-bootstrap';
import terapia from '../../assets/terapia.jpeg';

function Carouselcomp() {
    return (
        <Carousel>
            <Carousel.Item interval={2000}>
                <img src={terapia} alt="terapia" />
                <Carousel.Caption>
                    <h3>Terapia en niños</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img src={terapia} alt="terapia" />
                <Carousel.Caption>
                    <h3>Terapia en niños</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Carouselcomp;
