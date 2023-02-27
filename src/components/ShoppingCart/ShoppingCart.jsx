import React, { useState, useEffect} from "react";
import styles from './styles.module.css';
import CartItem from '../CartItem/CartItem';
import PropTypes from 'prop-types';
import CartShapes from "../../shapes/CartShapes";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cartItemCreate } from "../../store/actions/cartItemsActions";
import { createRecItems } from "../../store/actions/recommendedActions";
import { modalShow } from "../../store/actions/modalActions";
import { getIds } from "../../store/actions/idsGetActions";
import { getItems } from "../../store/actions/allItemsGetActions";
import { login } from "../../store/constants/constants";
import { offPreloader, onPreloader } from "../../store/actions/preloaderActions";

function ShoppingCart () {
    const dispatch = useDispatch();

    const idsStart = useSelector(state => state.cartIds.requestStart);
    const itemsStart = useSelector(state => state.allItems.requestStart);
    if ( itemsStart && idsStart ) {
        onPreloader();
    } else {
        offPreloader();
    }

    // получение данных апи
    useEffect(() => {
        let morePages = true;
        let currentPage = 0;
        while(morePages){
            currentPage++;
            dispatch(getItems(currentPage));
            morePages = currentPage < 2;
        }
        dispatch(getIds());
    }, [dispatch])

    const cartId = useSelector(state => state.cartIds.cartItemId);
    const recItems = useSelector(state => state.allItems.allItems);
    const total =useSelector(state => state.cart.totalCount);

    // создание списка товаров в корзине
    useEffect(() => {
        if(cartId.length !== 0 && recItems.length !== 0) {
            dispatch(cartItemCreate());
            dispatch(createRecItems());
        }
    }, [cartId.length, recItems.length, dispatch])
    const cartItems = useSelector(state => state.cart.cartItems);

    // State меняющий значение в чекбоксе "Выбрать все"
    const [deleteItemCheckbox, setDeleteItemCheckbox] = useState(true);


    return (
        <div className={styles.cart}>
                <div className={styles.content}>
                    <div className={styles.cartHead}>
                        <span>{total.value}</span>
                        <h1>Корзина</h1>
                    </div>
                    <div className={styles.cartWrapper}>
                        <div className={styles.cartLeft}>
                            <div className={styles.leftHead}>
                                <div className={styles.headWrapper}>
                                    <input type="checkbox" checked={deleteItemCheckbox} onChange={() => setDeleteItemCheckbox(!deleteItemCheckbox)} />
                                    <span>Выбрать все</span>
                                    <span className={styles.red}>Удалить выбранное</span>
                                </div>
                            </div>
                            <div className={styles.leftBody}>
                                {cartItems.length !== 0 && cartItems.map((el) => (el.id !== undefined) ?
                                    <CartItem item={el} key={el.key}/> : '')}
                            </div>
                        </div>
                        <div className={styles.cartRight}>
                        <div className={styles.rightGreenButton}>
                            <button onClick={() => dispatch(modalShow(login))}>Перейти к оформлению</button>
                        </div>
                        <div className={styles.rightSum}>
                            <div className={styles.sumCount}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Ваша корзина</th>
                                            <td>{total.value} товар * {total.weight}гр</td>
                                        </tr>
                                        <tr>
                                            <td>Товары ({total.value})</td>
                                            <td className={styles.bolder}>{total.price} ₽</td>
                                        </tr>
                                        <tr>
                                            <td>Скидка</td>
                                            <td className={`${styles.bolder} ${styles.red}`}>- {total.discount} ₽</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className={styles.sumFinal}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Общая стоимость</th>
                                            <th>{total.totalPrice} ₽</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
            </div>
                    </div>
                </div>
            </div>
    )
}
ShoppingCart.propTypes = {
    cartId: PropTypes.arrayOf(CartShapes).isRequired,
}
export default ShoppingCart;