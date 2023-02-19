import React from "react";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import { getIds } from "../../store/actions/idsGetActions";
import { getItems } from "../../store/actions/allItemsGetActions";

function Errors() {
    const idsError = useSelector(state => state.cartIds.requestError);
    const idsStatus = useSelector(state => state.cartIds.requestStatus);
    const idsList = useSelector(state => state.cartIds.cartItemId);

    const itemsError = useSelector(state => state.allItems.requestError);
    const itemsStatus = useSelector(state => state.allItems.requestStatus);
    const itemsList = useSelector(state => state.allItems.allItems);

    let error = '';

    if (idsError !== '') {
        error += `Сервер не отвечает. Невозможно получить товары корзины - ошибка: ${idsError}. Подождите пожалуйста!`;
        getIds();
    } else if(itemsError !== '') {
        error += `Сервер не отвечает. Невозможно получить товары корзины - ошибка: ${itemsError}. Подождите пожалуйста!`;
        getItems();
    } else if(idsStatus === 200 && idsList.length === 0) {
        error = 'У вас еще нет товаров в корзине';
    } else if(itemsStatus === 200 && itemsList.length === 0) {
        error = 'Список товаров недоступен. Попробуйте позже';
    } else {
        return error;
    }

     return (
        <>
            {(error !== '') ?
                <div className={styles.displayError}>
                    <h1 className={styles.bad}>{error}</h1> 
                </div>
            :
                <></>
            }
        </>
    )
}

export default Errors;