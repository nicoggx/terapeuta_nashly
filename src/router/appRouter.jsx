import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import history from '../history';
import Layout from '../Containers/Layout/Layout';
import Home from '../Containers/Home/Home';
import Calendar from '../Containers/Calendar/Calendar';
import Login from '../Containers/Login/Login';
import { verifyAuthExpire } from '../modules/auth/authModule';
import { authVerify } from '../util/auth';
import Register from '../Containers/Register/Register';

function AppRouter() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(verifyAuthExpire());
    }, [dispatch]);

    return (
        <BrowserRouter history={history}>
            <Layout>
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    {authVerify() && (
                        <Route exact path="/agenda" render={() => <Calendar />} />
                    )}
                    <Route exact path="/login" render={() => <Login />} />
                    <Route exact path="/registrar" render={() => <Register />} />
                    {authVerify() && <Redirect exact path="*" to="/" />}
                    {!authVerify() && <Redirect exact path="*" to="/login" />}
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default AppRouter;
