import './Home.css';
import Carouselcomp from '../../components/Carousel/Carousel';
import Main from '../../components/Main/Main';
import Footer from '../../components/Footer/Footer';

function Home() {
    return (
        <div className="home">
            <Carouselcomp />
            <Main />
            <Footer />
        </div>
    );
}

export default Home;
