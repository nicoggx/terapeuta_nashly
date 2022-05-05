import './Home.css';
import Carouselcomp from '../../components/Carousel/Carousel';
import Main from '../../components/Main/Main';

function Home() {
    return (
        <div className="home">
            <Carouselcomp />
            <Main />
        </div>
    );
}

export default Home;
