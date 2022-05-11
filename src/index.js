import React from "react";
import styles from './styles.module.css';
import ReactDOM from "react-dom";
import App from './components/App/App';

function Main() {
    return (
        <>
            <App />
        </>
    )
}

ReactDOM.render(
    <Main />, 
    document.getElementById('root')
);
