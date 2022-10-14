import React from 'react';
import styles from './styles.module.css';
import ShadowView from '../ShadowView/ShadowView';
import store from '../../reducers/Store';


function Modal(props) {

    return (
        <ShadowView>
            <div className={styles.windowWrapper}>
                <div className={styles.windowHead}>
                    
                    <button type='close' onClick={() => store.dispatch({type: 'HIDE'})}>×</button>
                </div>
                {props.children}
            </div>
        </ShadowView>
    )
}

export default Modal;