import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function Step3({ nextStep, previousStep }) {
    return (
        <div>
            <h1>Step 3</h1>
            <Button onClick={previousStep}>Volver</Button>
            <Button onClick={nextStep}>Continuar</Button>
        </div>
    );
}

Step3.defaultProps = {
    nextStep: () => {},
    previousStep: () => {},
};

Step3.propTypes = {
    nextStep: PropTypes.func,
    previousStep: PropTypes.func,
};

export default Step3;
