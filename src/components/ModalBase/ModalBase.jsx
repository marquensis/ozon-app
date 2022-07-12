import React, { useContext } from 'react';
import styles from './styles.module.css';
import ShowHideContext from '../../contexts/ContextView';
import Logo from './ozon_logo.png';
import ShadowView from '../ShadowView/ShadowView';

function Modal(props) {
    const {view, setView} = useContext(ShowHideContext);
    return (
        <ShadowView>
            <div className={styles.windowWrapper}>
                <div className={styles.windowHead}>
                    <div className={styles.ozonLogo}>
                            <img src={ Logo } alt="ozon-logo" />
                            <span>ID</span>
                    </div>
                    <button type='close' onClick={() => setView('hide')}>×</button>
                </div>
                {props.children}
            </div>
        </ShadowView>
    )
}

export default Modal;