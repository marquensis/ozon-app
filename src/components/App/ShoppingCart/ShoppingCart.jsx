import React, { useState } from "react";
import items from '../fixtures';
import CountItems from '../constants';
import styles from './ShoppingCart.module.css';
import CartItem from '../CartItem/CartItem';


function LeftBlock () {
    const [x, setX] = useState(true);
    return (
        <div className={styles['cart-left']}>
            <div className={styles['left-head']}>
                <div className={styles['head-wrapper']}>
                    <input type="checkbox" checked={x} onChange={() => setX(!x)} />
                    <span>Выбрать все</span>
                    <span className={styles['red']}>Удалить выбранное</span>
                </div>
            </div>
            <div className={styles['left-body']}>
                <CartItem item={items[0]}/>
                <CartItem item={items[1]}/>
                <CartItem item={items[2]}/>
            </div>
        </div>
    )
}

function RightBlock () {
    return (
        <div className={styles['cart-right']}>
            <div className={styles['right-green-button']}>
                <button>Перейти к оформлению</button>
            </div>
            <div className={styles['right-sum']}>
                <div className={styles['sum-count']}>
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
                        <td style={{fontWeight:'bolder'}} className={styles['red']}>- 5023 ₽</td>
                    </tr>
                </div>
                <hr />
                <div className={styles['sum-final']}>
                    <tr>
                        <th>Общая стоимость</th>
                        <th>12000 ₽</th>
                    </tr>
                </div>
            </div>
        </div>
    )
}

function ShoppingCart () {

    return (
        <div className={styles['cart']}>
            <div className={styles['content']}>
                <div className={styles['cart-head']}>
                    <span>{CountItems}</span>
                    <h1>Корзина</h1>
                </div>
                <div className={styles['cart-wrapper']}>
                    <LeftBlock />
                    <RightBlock />
                </div>
            </div>
        </div>
    )
}
export default ShoppingCart;