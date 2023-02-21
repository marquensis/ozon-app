import React from "react";
import styles from "./style.module.css";
import Modal from '../ModalBase/ModalBase';
import Logo from './ozon_logo.png';
import { useSelector } from "react-redux";
import { getIds } from "../../store/actions/idsGetActions";
import { getItems } from "../../store/actions/allItemsGetActions";
import { modalShow } from "../../store/actions/modalActions";
import { error } from "../../store/constants/constants";

function Errors() {
    const idsError = useSelector(state => state.cartIds.requestError);
    const idsStatus = useSelector(state => state.cartIds.requestStatus);
    const idsList = useSelector(state => state.cartIds.cartItemId);

    const itemsError = useSelector(state => state.allItems.requestError);
    const itemsStatus = useSelector(state => state.allItems.requestStatus);
    const itemsList = useSelector(state => state.allItems.allItems);

    let errorText = '';

    if (idsError !== '') {
        errorText += `Сервер не отвечает. Невозможно получить товары корзины - ошибка: ${idsError}. Подождите пожалуйста!`;
        modalShow(error);
        getIds();
    } else if(itemsError !== '') {
        errorText += `Сервер не отвечает. Невозможно получить товары корзины - ошибка: ${itemsError}. Подождите пожалуйста!`;
        modalShow(error);
        getItems();
    } else if(idsStatus === 200 && idsList.length === 0) {
        errorText = 'У вас еще нет товаров в корзине';
        modalShow(error);
    } else if(itemsStatus === 200 && itemsList.length === 0) {
        errorText = 'Список товаров недоступен. Попробуйте позже';
        modalShow(error);
    } else {
        return null;
    } 

     return (
        <Modal modalName={error}>
            <div className={styles.ozonLogo}>
                <img src={ Logo } alt="ozon-logo" />
                <span>ID</span>
            </div>
            <div className={styles.windowText}>
                <h3>Ошибка</h3>
                <p>{errorText}</p>
            </div>
        </Modal>
    )
}

export default Errors;