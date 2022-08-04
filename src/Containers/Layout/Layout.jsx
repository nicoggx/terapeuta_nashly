import PropTypes from 'prop-types';
import './Layout.module.css';
import { useSelector } from 'react-redux';
import Navcomp from '../../components/Navbar/Navcomp';
import Loading from '../../components/Loading/Loading';

function Layout({ children }) {
    const { loading, loadingTitle } = useSelector((state) => state.auth);
    return (
        <div className="layout">
            <Loading show={loading} title={loadingTitle} />
            <Navcomp />
            {children}
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
