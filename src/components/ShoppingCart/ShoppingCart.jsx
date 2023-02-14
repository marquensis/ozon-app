import React, { useState, useEffect} from "react";
import styles from './styles.module.css';
import CartItem from '../CartItem/CartItem';
import PropTypes from 'prop-types';
import CartShapes from "../../shapes/CartShapes";
import { useDispatch } from "react-redux";
import { SHOW } from "../../Store/types/types";
import { useSelector } from "react-redux";
import { createCartItems } from "../../Store/actions/cartItemsActions";
import { updateActualTotal } from "../../Store/actions/totalActions";

function ShoppingCart () {
    const dispatch = useDispatch();

    const cartId = useSelector(state => state.cartItemId);
    const recItems = useSelector(state => state.allItems);
    const total =useSelector(state => state.totalCount);

    // создание списка товаров в корзине
    useEffect(() => {
        dispatch(createCartItems(cartId, recItems));
    }, [cartId, recItems, dispatch])
    const cartItems = useSelector(state => state.cartItems);

    useEffect(() => {
        dispatch(updateActualTotal(cartItems));
    }, [cartItems, dispatch] );

    // State меняющий значение в чекбоксе "Выбрать все"
    const [deleteItemCheckbox, setDeleteItemCheckbox] = useState(true);

    // Открыть модалку логина
    const showModalLogin = () => {
        dispatch({type: 'CHANGE_MODAL', payload: SHOW});
    }

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
                            <button onClick={showModalLogin}>Перейти к оформлению</button>
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