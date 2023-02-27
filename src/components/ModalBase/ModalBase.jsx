import React from 'react';
import styles from './styles.module.css';
import ShadowView from '../ShadowView/ShadowView';
import { useDispatch } from "react-redux";
import { modalHide } from '../../store/actions/modalActions';


function Modal({modalName, children}) {

    const dispatch = useDispatch();
    return (
        <ShadowView modalName={modalName}>
            <div className={styles.windowWrapper}>
                <div className={styles.windowHead}>
                    <button type='close' onClick={() => dispatch(modalHide(modalName))}>×</button>
                </div>
                {children}
            </div>
        </ShadowView>
    )
}

export default Modal;