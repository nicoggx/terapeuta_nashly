export const ENV = {
    ENVIRONMENT: window._env_
        ? window._env_.REACT_APP_ENVIRONMENT
        : process.env.REACT_APP_ENVIRONMENT,
    BFF_PATH: window._env_
        ? window._env_.REACT_APP_PATH
        : process.env.REACT_APP_PATH,
};
