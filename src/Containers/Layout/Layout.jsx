import PropTypes from 'prop-types';
import './Layout.module.css';
import Navcomp from '../../components/Navbar/Navcomp';

function Layout({ children }) {
    return (
        <div className="layout">
            <Navcomp />
            {children}
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
