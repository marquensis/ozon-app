import React from "react";
import styles from './styles.module.css';
import { useDispatch, useSelector } from "react-redux";
import { modalHide } from "../../store/actions/modalActions";

function ShadowView(props) {

    const dispatch = useDispatch();
    const view = useSelector(state => state.modal.view);

    return(
        <div className={styles[view]}>
            <div className={styles.click} onClick={() => dispatch(modalHide())}></div>
            {props.children}
        </div>
    )
}

export default ShadowView;