import React from "react";
import './styles.module.css';
import ReactDOM from "react-dom";
import App from './components/App/App';
import store from "./Store/reducers/Store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root')
);
