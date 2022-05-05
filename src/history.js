import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
export const temporalUri = '/temp';

export const redirectTo = (path) => {
    const currentPath = window.location.pathname;
    if (currentPath === path) {
        history.push(temporalUri);
        history.back();
    } else {
        history.push(path);
    }
};

export default history;
