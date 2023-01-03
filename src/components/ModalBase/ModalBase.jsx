import React from 'react';
import styles from './styles.module.css';
import ShadowView from '../ShadowView/ShadowView';
import { HIDE } from '../../reducers/Store';
import { useDispatch } from "react-redux";


function Modal(props) {

    const dispatch = useDispatch();

    const hideModalLogin = () => {
        dispatch({type: HIDE});
    }

    return (
        <ShadowView>
            <div className={styles.windowWrapper}>
                <div className={styles.windowHead}>
                    
                    <button type='close' onClick={hideModalLogin}>×</button>
                </div>
                {props.children}
            </div>
        </ShadowView>
    )
}

export default Modal;