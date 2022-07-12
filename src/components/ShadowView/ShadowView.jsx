import React, { useContext } from "react";
import styles from './styles.module.css';
import ShowHideContext from "../../contexts/ContextView";

function ShadowView(props) {
    const {view, setView} = useContext(ShowHideContext);

    return(
        <div className={styles[view]}>
            <div className={styles.click} onClick={() => setView('hide')}></div>
            {props.children}
        </div>
    )
}

export default ShadowView;