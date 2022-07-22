import React, { useContext } from "react";
import styles from './styles.module.css';
import ShowHideContext from "../../contexts/ContextView";

function ShadowView(props) {
    
    const {isModalOpen, setIsModalOpen} = useContext(ShowHideContext);
    const showHide = isModalOpen === true ? 'show' : 'hide'

    return(
        <div className={styles[showHide]}>
            <div className={styles.click} onClick={() => setIsModalOpen(false)}></div>
            {props.children}
        </div>
    )
}

export default ShadowView;