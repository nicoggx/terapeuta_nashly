import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { useLayout } from '../../hooks/useLayout';
import './Loading.css';

function Loading({ show, title }) {
    const { height, width } = useLayout();
    if (!show) return null;
    return (
        <div className="loadingContainer" style={{ height, width }}>
            <Spinner animation="border" variant="success" />
            {title && <span className="loadingTitle">{title}</span>}
        </div>
    );
}

Loading.defaultProps = {
    title: '',
    show: false,
};

Loading.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
};

export default Loading;
