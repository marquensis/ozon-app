import React from 'react';
import styles from './styles.module.css';
import ShadowView from '../ShadowView/ShadowView';
import { useDispatch } from "react-redux";
import { modalHide } from '../../store/actions/modalActions';


function Modal(props) {

    const dispatch = useDispatch();

    return (
        <ShadowView>
            <div className={styles.windowWrapper}>
                <div className={styles.windowHead}>
                    
                    <button type='close' onClick={() => dispatch(modalHide())}>×</button>
                </div>
                {props.children}
            </div>
        </ShadowView>
    )
}

export default Modal;