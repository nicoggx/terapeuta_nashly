import PropTypes from 'prop-types';
import './Layout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Navcomp from '../../components/Navbar/Navcomp';
import Loading from '../../components/Loading/Loading';
import AlertComp from '../../components/Alert/Alert';
import { disabledAlert } from '../../modules/session/sessionModule';

function Layout({ children }) {
    const dispatch = useDispatch();
    const { loading, loadingTitle } = useSelector((state) => state.auth);
    const { showAlert } = useSelector((state) => state.sessions);

    if (showAlert) {
        setTimeout(() => {
            dispatch(disabledAlert());
        }, 10000);
    }
    return (
        <div className="layout">
            {loading && <Loading show={loading} title={loadingTitle} />}
            <Navcomp />
            {children}
            <AlertComp show={showAlert} />
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
