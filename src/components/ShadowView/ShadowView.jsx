import React from "react";
import styles from './styles.module.css';
import { HIDE } from "../../Store/types/types";
import { useDispatch, useSelector } from "react-redux";

function ShadowView(props) {

    const dispatch = useDispatch();
    const view = useSelector(state => state.view);

    const hideModalLogin = () => {
        dispatch({type: 'CHANGE_MODAL', payload: HIDE});
    }

    return(
        <div className={styles[view]}>
            <div className={styles.click} onClick={hideModalLogin}></div>
            {props.children}
        </div>
    )
}

export default ShadowView;