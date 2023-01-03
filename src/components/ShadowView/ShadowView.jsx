import React from "react";
import styles from './styles.module.css';
import store from "../../reducers/Store";
import { HIDE, SHOW } from '../../reducers/Store';
import { useDispatch } from "react-redux";

function ShadowView(props) {

    const dispatch = useDispatch();

    const hideModalLogin = () => {
        dispatch({type: HIDE});
    }
    const showHide = store.getState() === SHOW ? 'show' : 'hide';
    console.log(showHide);
    return(
        <div className={styles[showHide]}>
            <div className={styles.click} onClick={hideModalLogin}></div>
            {props.children}
        </div>
    )
}

export default ShadowView;