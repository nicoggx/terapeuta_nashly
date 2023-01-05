import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { disabledAlert } from '../../modules/session/sessionModule';
import { useLayout } from '../../hooks/useLayout';
import './Alert.css';

function AlertComp({ show }) {
    const dispatch = useDispatch();
    const { height, width } = useLayout();

    const { bodyAlert, alertTitle, typeAlert } = useSelector(
        (state) => state.sessions,
    );

    const handleDisabledAlert = () => {
        dispatch(disabledAlert());
    };
    return (
        <div className="alertContainer" style={{ height, width }}>
            {show && (
                <Alert
                    className="alertDiv"
                    variant={typeAlert}
                    onClose={() => handleDisabledAlert()}
                    dismissible>
                    <Alert.Heading>{alertTitle}</Alert.Heading>
                    <p>{bodyAlert}</p>
                </Alert>
            )}
        </div>
    );
}

AlertComp.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default AlertComp;
