import React, {useMemo, useState, useContext, useEffect} from "react";
import styles from './styles.module.css';
import CartItem from '../CartItem/CartItem';
import {nanoid} from 'nanoid';
import PropTypes from 'prop-types';
import RecommendedShapes from "../../shapes/RecShapes";
import CartShapes from "../../shapes/CartShapes";
import ShowHideContext from "../../contexts/ContextView";
import CartChangesContext from "../../contexts/ContextCartChanges";
import AllItemsContext from "../../contexts/ContextAllItems";

function ShoppingCart({cartId}) {

    const rec = useContext(AllItemsContext)
    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState({
        weight: 0,
        count: 0,
        price: 0,
        totalPrice: 0,
        discount: 0,
    })

        //useMemo(() => {
    useEffect(() => {
        if (cartId && rec) {
            setCartItems(cartId.map((item) => {
                console.log('useMemo cartItems');
                const equalId = rec.find(recVal => item.id === recVal.id);
                const result = (equalId === undefined) ? {} : {
                    ...item,
                    ...equalId,
                    ...{
                        key: nanoid(),
                        updatedPrice: equalId.price * item.count,
                        updatedWeight: equalId.weight * item.count,
                        updatedDiscount: (equalId.price * item.count) * equalId.discount / 100,
                        totalPrice: (equalId.price * item.count) - (equalId.price * item.count) * equalId.discount / 100
                    }
                };

                console.log('cartItems', result)
                return result;
            }))
            setTotal({
                weight: cartItems.reduce((prev, current) => {
                    return (prev + current.updatedWeight) || 0
                }, 0),
                count: cartItems.reduce((prev, current) => {
                    return (prev + current.value) || 0
                }, 0),
                price: cartItems.reduce((prev, current) => {
                    return (prev + current.updatedPrice) || 0
                }, 0),
                totalPrice: cartItems.reduce((prev, current) => {
                    return (prev + current.updatedDiscount) || 0
                }, 0),
                discount: cartItems.reduce((prev, current) => {
                    return (prev + current.totalPrice) || 0
                }, 0),
            })
        }
    }, [cartId, rec] );

    // Функция изменения количества товаров
    const resetVal = (itemId, newVal) => {
        console.log('resetVal', itemId, newVal)
        console.log(cartItems);

        cartItems.forEach((el, id) => {
            itemId === el.id ? cartItems[id].count = +newVal : cartItems[id].count = el.count;
            cartItems[id].updatedPrice = el.price * el.count;
            cartItems[id].updatedWeight = el.weight * el.count;
            cartItems[id].updatedDiscount = (el.price * el.count) * el.discount / 100;
            cartItems[id].totalPrice = (el.price * el.count) - (el.price * el.count) * el.discount / 100;
        });
        setCartItems(cartItems);
        setTotal({
            weight: cartItems.reduce((prev, current) => {
                return prev + current.updatedWeight
            }, 0),
            count: cartItems.reduce((prev, current) => {
                return prev + current.value
            }, 0),
            price: cartItems.reduce((prev, current) => {
                return prev + current.updatedPrice
            }, 0),
            totalPrice: cartItems.reduce((prev, current) => {
                return prev + current.updatedDiscount
            }, 0),
            discount: cartItems.reduce((prev, current) => {
                return prev + current.totalPrice
            }, 0),
        })

    };
/*
    console.log(cartItems)
    useEffect(() => {
        console.log('useEffect setTotal')
        setTotal({
            weight: cartItems.reduce((prev, current) => {
                return prev + current.updatedWeight
            }, 0),
            count: cartItems.reduce((prev, current) => {
                return prev + current.value
            }, 0),
            price: cartItems.reduce((prev, current) => {
                return prev + current.updatedPrice
            }, 0),
            totalPrice: cartItems.reduce((prev, current) => {
                return prev + current.updatedDiscount
            }, 0),
            discount: cartItems.reduce((prev, current) => {
                return prev + current.totalPrice
            }, 0),
        })
    }, [cartItems]);
*/
    // State меняющий значение в чекбоксе "Выбрать все"
    const [x, setX] = useState(true);

    // Кнопка открытия логин окна
    const {view, setView} = useContext(ShowHideContext);

    return (
        <CartChangesContext.Provider value={{view}}>
            <div className={styles.cart}>
                <div className={styles.content}>
                    <div className={styles.cartHead}>
                        <span>{total.count}</span>
                        <h1>Корзина</h1>
                    </div>
                    <div className={styles.cartWrapper}>
                        <div className={styles.cartLeft}>
                            <div className={styles.leftHead}>
                                <div className={styles.headWrapper}>
                                    <input type="checkbox" checked={x} onChange={() => setX(!x)}/>
                                    <span>Выбрать все</span>
                                    <span className={styles.red}>Удалить выбранное</span>
                                </div>
                            </div>
                            <div className={styles.leftBody}>
                                {cartItems && cartItems.length !== 0 && cartItems.map((el) => (el.id !== undefined) ?
                                    <CartItem item={el} key={el.key} resetVal={resetVal}/> : '')}
                            </div>
                        </div>
                        <div className={styles.cartRight}>
                            <div className={styles.rightGreenButton}>
                                <button onClick={() => setView('show')}>Перейти к оформлению</button>
                            </div>
                            <div className={styles.rightSum}>
                                <div className={styles.sumCount}>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th>Ваша корзина</th>
                                            <td>{total.count} товар * {total.weight}гр</td>
                                        </tr>
                                        <tr>
                                            <td>Товары ({total.count})</td>
                                            <td className={styles.bolder}>{total.price} ₽</td>
                                        </tr>
                                        <tr>
                                            <td>Скидка</td>
                                            <td className={`${styles.bolder} ${styles.red}`}>- {total.discount} ₽</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <hr/>
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
        </CartChangesContext.Provider>
    )
}

ShoppingCart.propTypes = {
    cartId: PropTypes.arrayOf(CartShapes).isRequired,
}
export default ShoppingCart;
