import React, { useState } from "react";
import styles from './CartItem.module.css';

function CartItem (props) {
    const {item} = props;
    const [price, priceUp] = useState(item.price);
    const discount = item.price - (item.price/100*35);
    const [x, setX] = useState(true);
    return (
        <div className={styles['cart-item-wrapper']}>
            <div className={styles['item-description']}>
                <div><input type="checkbox" checked={x} onChange={() => setX(!x)} /></div>
                {/* <img src={require(item.image)} alt={item.name} /> */}
                <div>
                    <h3>{item.name}</h3>
                    <p style={{color:'lightgray'}}>цвет {item.color}, {item.weight}</p>
                </div>
            </div>
            <div className={styles['item-price']}>
                <h3 style={{fontWeight:'bold'}}>{discount} ₽</h3>
                <h3 style={{color:'red'}}><span>{price} ₽</span> Скидка {item.price/100*35} ₽</h3>
            </div>
            <div className={styles['item-count']}>
                <select>
                    <option value='1' selected>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
            </div>
        </div>
    )
}


export default CartItem;
