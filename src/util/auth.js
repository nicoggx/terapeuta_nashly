export const authVerify = () => {
    return !!JSON.parse(localStorage.getItem('auth'));
};

export const logOut = () => {
    localStorage.removeItem('auth');
};
