import React from "react";
import styles from './index.module.css';
import { render } from "react-dom";
import App from './components/App/app.jsx';

function Page () {
    render(<App />, document.getElementById('root'));
}

setInterval(Page, 10);