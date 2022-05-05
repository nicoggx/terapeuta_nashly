import { useEffect, useState, useContext, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const viewportContext = createContext({});

function ViewportProvider({ children }) {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    const vals = useMemo(() => ({ width, height }), [width, height]);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return (
        <viewportContext.Provider value={vals}>{children}</viewportContext.Provider>
    );
}

ViewportProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const useViewport = () => {
    const { width, height } = useContext(viewportContext);
    return { width, height };
};

export { useViewport, ViewportProvider, viewportContext };
