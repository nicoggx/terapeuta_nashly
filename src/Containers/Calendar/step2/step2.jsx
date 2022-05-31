import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function Step2({ nextStep, previousStep }) {
    return (
        <div>
            <h1>Step 2</h1>
            <Button onClick={previousStep}>Volver</Button>
            <Button onClick={nextStep}>Continuar</Button>
        </div>
    );
}

Step2.defaultProps = {
    nextStep: () => {},
    previousStep: () => {},
};

Step2.propTypes = {
    nextStep: PropTypes.func,
    previousStep: PropTypes.func,
};

export default Step2;
