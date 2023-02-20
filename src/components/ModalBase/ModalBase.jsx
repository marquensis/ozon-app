import React from 'react';
import styles from './styles.module.css';
import ShadowView from '../ShadowView/ShadowView';
import { useDispatch } from "react-redux";
import { modalHide } from '../../store/actions/modalActions';


function Modal({children}) {

    const dispatch = useDispatch();
    const propName = children[0]._owner.elementType.componentName;
    return (
        <ShadowView>
            <div className={styles.windowWrapper}>
                <div className={styles.windowHead}>
                    <button type='close' onClick={() => dispatch(modalHide(propName))}>×</button>
                </div>
                {children}
            </div>
        </ShadowView>
    )
}

export default Modal;