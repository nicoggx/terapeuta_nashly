import './Footer.css';
import { BsInstagram, BsFacebook, BsLinkedin } from 'react-icons/bs';
import webpay from '../../assets/webpay.png';

function Footer() {
    return (
        <div className="footer">
            <div className="footerDiv">
                <div className="footersubDiv">
                    <h4>Sigueme en mis redes sociales</h4>
                    <div className="footerIcons">
                        <div className="footerIcon">
                            <BsInstagram size="30" />
                        </div>
                        <div className="footerIcon">
                            <BsFacebook size="30" />
                        </div>
                        <div className="footerIcon">
                            <BsLinkedin size="30" />
                        </div>
                    </div>
                </div>
                <div className="footersubDiv">
                    <h4>Medios de pago</h4>
                    <img width="150" src={webpay} alt="webpay" />
                </div>
            </div>
        </div>
    );
}

export default Footer;
