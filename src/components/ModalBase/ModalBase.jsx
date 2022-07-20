import React, { useContext } from 'react';
import styles from './styles.module.css';
import ShowHideContext from '../../contexts/ContextView';
import ShadowView from '../ShadowView/ShadowView';

function Modal(props) {
    const {isModalOpen, setIsModalOpen} = useContext(ShowHideContext);
  
    return (
        <ShadowView>
            <div className={styles.windowWrapper}>
                <div className={styles.windowHead}>
                    
                    <button type='close' onClick={() => setIsModalOpen(false)}>×</button>
                </div>
                {props.children}
            </div>
        </ShadowView>
    )
}

export default Modal;