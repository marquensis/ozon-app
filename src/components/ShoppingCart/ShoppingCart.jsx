import React, { useState, useContext, useEffect} from "react";
import styles from './styles.module.css';
import CartItem from '../CartItem/CartItem';
import {nanoid} from 'nanoid';
import PropTypes from 'prop-types';
import CartShapes from "../../shapes/CartShapes";
import ShowHideContext from "../../contexts/ContextView";
import CartChangesContext from "../../contexts/ContextCartChanges";
import AllItemsContext from "../../contexts/ContextAllItems";

function ShoppingCart ({cartId}) {

    const recItems = useContext(AllItemsContext);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState({
        weight: 0,
        count: 0,
        price: 0,
        totalPrice: 0,
        discount: 0,
    })

        //useMemo(() => {
    useEffect(() => {
        if (cartId && recItems) {
            setCartItems(cartId.map((item) => {

                const equalId = recItems.find(recVal => item.id === recVal.id);
                const result = (equalId === undefined) ? {} : {
                    ...item,
                    ...equalId,
                    ...{
                        key: nanoid(),
                        updatedPrice: equalId.price * equalId.value,
                        updatedWeight: equalId.weight * equalId.value,
                        updatedDiscount: (equalId.price * equalId.value) * equalId.discount / 100,
                        totalPrice: (equalId.price * equalId.value) - (equalId.price * equalId.value) * equalId.discount / 100
                    }
                };
                return result;
            }))
            setTotal({
                weight: cartItems.reduce((prev, current) => {
                    return (prev + current.updatedWeight) || 0
                }, 0),
                value: cartItems.reduce((prev, current) => {
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
    }, [cartId, recItems] );

    // ?????????????? ?????????????????? ???????????????????? ??????????????
    const resetVal = (itemId, newVal) => {

        cartItems.forEach((el, id) => {
            itemId === el.id ? cartItems[id].value = +newVal : cartItems[id].value = el.value;
            cartItems[id].updatedPrice = el.price * el.value;
            cartItems[id].updatedWeight = el.weight * el.value;
            cartItems[id].updatedDiscount = (el.price * el.value) * el.discount / 100;
            cartItems[id].totalPrice = (el.price * el.value) - (el.price * el.value) * el.discount / 100;
        });
        setCartItems(cartItems);
        setTotal({
            weight: cartItems.reduce((prev, current) => {
                return prev + current.updatedWeight
            }, 0),
            value: cartItems.reduce((prev, current) => {
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

    // State ???????????????? ???????????????? ?? ???????????????? "?????????????? ??????"
    const [deleteItemCheckbox, setDeleteItemCheckbox] = useState(true);

    // ???????????? ???????????????? ?????????? ????????
    const {isModalOpen, setIsModalOpen} = useContext(ShowHideContext);

    return (
        <CartChangesContext.Provider value={{isModalOpen}}>
            <div className={styles.cart}>
                <div className={styles.content}>
                    <div className={styles.cartHead}>
                        <span>{total.value}</span>
                        <h1>??????????????</h1>
                    </div>
                    <div className={styles.cartWrapper}>
                        <div className={styles.cartLeft}>
                            <div className={styles.leftHead}>
                                <div className={styles.headWrapper}>
                                    <input type="checkbox" checked={deleteItemCheckbox} onChange={() => setDeleteItemCheckbox(!deleteItemCheckbox)} />
                                    <span>?????????????? ??????</span>
                                    <span className={styles.red}>?????????????? ??????????????????</span>
                                </div>
                            </div>
                            <div className={styles.leftBody}>
                                {cartItems && cartItems.length !== 0 && cartItems.map((el) => (el.id !== undefined) ?
                                    <CartItem item={el} key={el.key} resetVal={resetVal}/> : '')}
                            </div>
                        </div>
                        <div className={styles.cartRight}>
                        <div className={styles.rightGreenButton}>
                            <button onClick={() => setIsModalOpen(true)}>?????????????? ?? ????????????????????</button>
                        </div>
                        <div className={styles.rightSum}>
                            <div className={styles.sumCount}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>???????? ??????????????</th>
                                            <td>{total.value} ?????????? * {total.weight}????</td>
                                        </tr>
                                        <tr>
                                            <td>???????????? ({total.value})</td>
                                            <td className={styles.bolder}>{total.price} ???</td>
                                        </tr>
                                        <tr>
                                            <td>????????????</td>
                                            <td className={`${styles.bolder} ${styles.red}`}>- {total.discount} ???</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className={styles.sumFinal}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>?????????? ??????????????????</th>
                                            <th>{total.totalPrice} ???</th>
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