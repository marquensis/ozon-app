import React, { useState } from "react";
import styles from './ShoppingCart.module.css';
// import cartItems from "../../fixtures/cart-fixtures";
import CartItem from '../CartItem/CartItem';
import CountItems from '../constants';
import { nanoid } from 'nanoid';

function CartItemList ({list}) {
    return (
        <div className={styles.leftBody}>
            {list.map(el => <CartItem item={el} key={nanoid()}/>)}
        </div>
    );
}

function ShoppingCart ({cart}) {
    const [x, setX] = useState(true);
    return (
        <div className={styles.cart}>
            <div className={styles.content}>
                <div className={styles.cartHead}>
                    <span>{CountItems}</span>
                    <h1>Корзина</h1>
                </div>
                <div className={styles.cartWrapper}>
                    <div className={styles.cartLeft}>
                        <div className={styles.leftHead}>
                            <div className={styles.headWrapper}>
                                <input type="checkbox" checked={x} onChange={() => setX(!x)} />
                                <span>Выбрать все</span>
                                <span styles={{color:'red'}}>Удалить выбранное</span>
                            </div>
                        </div>
                        <CartItemList list={cart}/>
                    </div>
                    <div className={styles.cartRight}>
                    <div className={styles.rightGreenButton}>
                        <button>Перейти к оформлению</button>
                    </div>
                    <div className={styles.rightSum}>
                        <div className={styles.sumCount}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Ваша корзина</th>
                                        <td>{CountItems} товар * 600гр</td>
                                    </tr>
                                    <tr>
                                        <td>Товары ({CountItems})</td>
                                        <td style={{fontWeight:'bolder'}}>12000 ₽</td>
                                    </tr>
                                    <tr>
                                        <td>Скидка</td>
                                        <td style={{fontWeight:'bolder'}} className={styles.red}>- 5023 ₽</td>
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
                                        <th>12000 ₽</th>
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
export default ShoppingCart;