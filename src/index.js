import React from "react";
import './styles.module.css';
import ReactDOM from "react-dom";
import App from './components/App/App';
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from "./store/reducers/rootReducer";
import thunk from 'redux-thunk';

// store
const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
