import React, { useState, useMemo } from "react";
import styles from './CartItem.module.css';
import { nanoid } from 'nanoid';


function OptionCount () {
    let option = [];
    for (let i = 1; i <= 10; i++) {
      option.push(<option value={i} key={nanoid()}>{i}</option>);
    }
    return option;
}

function CartItem ({item}) {
    const [selects, setSelects] = useState(1);
    const price = useMemo(() => item.price*selects, [item.price, selects]);
    const discount = useMemo(() => (price/100*35), [price]);
    const afterDiscount = useMemo(() => (price - discount), [price, discount]);
    const [x, setX] = useState(true);
    return (
        <div className={styles.cartItemWrapper}>
            <div className={styles.itemDescription}>
                <div><input type="checkbox" checked={x} onChange={() => setX(!x)} /></div>
                <img src={item.image} alt={item.name} />
                <div>
                    <h3>{item.name}</h3>
                    <p style={{color:'lightgray'}}>цвет {item.color}, {item.weight}</p>
                </div>
            </div>
            <div className={styles.itemPrice}>
                <h3 style={{fontWeight:'bold'}}>{afterDiscount} ₽</h3>
                <h3 style={{color:'red'}}><span>{price} ₽</span> Скидка {discount} ₽</h3>
            </div>
            <div className={styles.itemCount}>
                <select 
                    className={styles.select} 
                    value={selects} 
                    onChange={(e) => setSelects(e.target.value)}>
                    <OptionCount />
                </select>
            </div>
        </div>
    )
}


export default CartItem;
