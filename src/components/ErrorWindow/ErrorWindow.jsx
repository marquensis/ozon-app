import React from "react";
import styles from "./style.module.css";
import Modal from '../ModalBase/ModalBase';
import Logo from './ozon_logo.png';
import { useSelector } from "react-redux";
import { error } from "../../store/constants/constants";

function Errors() {
    const {textError} = useSelector(state => state.modal.error);
     return (
        <Modal modalName={error}>
            <div className={styles.ozonLogo}>
                <img src={ Logo } alt="ozon-logo" />
                <span>ID</span>
            </div>
            <div className={styles.windowText}>
                <h3>Ошибка</h3>
                <p>{textError}</p>
            </div>
        </Modal>
    )
}

export default Errors;