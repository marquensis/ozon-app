import React from "react";
import styles from './styles.module.css';
import { useDispatch, useSelector } from "react-redux";
import { modalHide } from "../../store/actions/modalActions";

function ShadowView({modalName, children}) {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);
    const modalsList = Object.keys(modal);
    let showHide = 'hide';
    for (let i = 0; i < modalsList.length; i++) {
        if (modalsList[i] === modalName) {
            showHide = modal[modalsList[i]].visible ? 'show' : 'hide';
        }
    }
    
    return(
        <div className={styles[showHide]}>
            <div className={styles.click} onClick={() => dispatch(modalHide(modalName))}></div>
            {children}
        </div>
    )
}

export default ShadowView;