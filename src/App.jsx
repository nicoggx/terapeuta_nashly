import { Provider } from 'react-redux';
import { store } from './modules';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ParamProvider } from './context/ParamContext';
import AppRouter from './router/appRouter';

function App() {
    return (
        <Provider store={store}>
            <ParamProvider>
                <AppRouter />
            </ParamProvider>
        </Provider>
    );
}

export default App;
