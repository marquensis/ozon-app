import React from "react";
import styles from './styles.module.css';
import { useDispatch, useSelector } from "react-redux";
import { modalHide } from "../../store/actions/modalActions";

function ShadowView({children}) {
    const dispatch = useDispatch();
    const propName = children._owner.pendingProps.children[0]._owner.elementType.componentName;
    const modal = useSelector(state => state.modal);
    const modalsList = Object.keys(modal);
    let showHide = 'hide';
    for (let i = 0; i < modalsList.length; i++) {
        if (modalsList[i] === propName) {
            showHide = modal[modalsList[i]].visible ? 'show' : 'hide';
        }
    }
    
    return(
        <div className={styles[showHide]}>
            <div className={styles.click} onClick={() => dispatch(modalHide(propName))}></div>
            {children}
        </div>
    )
}

export default ShadowView;