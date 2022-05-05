import { Route, Router, Switch } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Layout from './Containers/Layout/Layout';
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Router history={history}>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
