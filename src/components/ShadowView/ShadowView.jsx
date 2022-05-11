import React, { useContext } from "react";
import styles from './styles.module.css';
import LoginWindow from "../LoginWindow/LoginWindow";
import ShowHideContext from "../../contexts/ContextView";

function ShadowView() {
    const {view, setView} = useContext(ShowHideContext);

    const change = () => {
        setView(view === 'hide' ? 'show' : 'hide');
    }

    return(
        <div className={styles[view]}>
            <div className={styles.click} onClick={change}></div>
            <LoginWindow />
        </div>
    )
}

export default ShadowView;