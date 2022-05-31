import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './modules';
import Home from './Containers/Home/Home';
import Layout from './Containers/Layout/Layout';
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Calendar from './Containers/Calendar/Calendar';

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/agenda">
                            <Calendar />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </Provider>
    );
}

export default App;
