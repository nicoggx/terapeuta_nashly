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
import RegisterHoursT from '../Containers/TO/RegisterHoursTO/RegisterHoursTO';
import ViewHoursTO from '../Containers/TO/ViewHoursTO/ViewHoursTO';
import HistoryHoursTo from '../Containers/TO/HistoryHoursTO/HistoryHoursTo';

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
                    {authVerify() && (
                        <Route
                            exact
                            path="/registerHours"
                            render={() => <RegisterHoursT />}
                        />
                    )}
                    {authVerify() && (
                        <Route
                            exact
                            path="/viewHoursTO"
                            render={() => <ViewHoursTO />}
                        />
                    )}
                    {authVerify() && (
                        <Route
                            exact
                            path="/historyHoursTO"
                            render={() => <HistoryHoursTo />}
                        />
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
