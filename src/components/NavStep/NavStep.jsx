import PropTypes from 'prop-types';
import './NavStep.css';

function NavStep({ totalSteps, currentStep }) {
    console.log('currentStep: ', currentStep);
    console.log('totalSteps: ', totalSteps);
    const dots = [];
    for (let i = 1; i <= totalSteps; i += 1) {
        const isActive = currentStep === i;
        dots.push(
            <span key={i} className={`dot ${isActive ? 'active' : ''}`}>
                &bull;
            </span>,
        );
    }

    return <div className="nav">{dots}</div>;
}

NavStep.defaultProps = {
    totalSteps: 1,
    currentStep: 1,
};

NavStep.propTypes = {
    totalSteps: PropTypes.number,
    currentStep: PropTypes.number,
};

export default NavStep;
