import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function Step1({ nextStep }) {
    return (
        <div>
            <h1>Step 1</h1>
            <Button onClick={nextStep}>Continuar</Button>
        </div>
    );
}

Step1.defaultProps = {
    nextStep: () => {},
};

Step1.propTypes = {
    nextStep: PropTypes.func,
};

export default Step1;
