import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ParamContext = createContext();

export function ParamProvider({ children, params }) {
    const pam = useMemo(() => params, [params]);

    return <ParamContext.Provider value={pam}>{children}</ParamContext.Provider>;
}

ParamProvider.propTypes = {
    children: PropTypes.node,
    params: PropTypes.shape({
        showResume: PropTypes.bool,
        goToCreditCard: PropTypes.func,
        goToPayment: PropTypes.func,
    }),
};
