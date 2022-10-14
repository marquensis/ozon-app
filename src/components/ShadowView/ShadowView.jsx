import React from "react";
import styles from './styles.module.css';
import store from "../../reducers/Store";

function ShadowView(props) {
    const showHide = store.getState() === 'SHOW' ? 'show' : 'hide';
    console.log(showHide);
    return(
        <div className={styles[showHide]}>
            <div className={styles.click} onClick={() => store.dispatch({type: 'HIDE'})}></div>
            {props.children}
        </div>
    )
}

store.subscribe(() => {
    
});

export default ShadowView;