import React, { useState, useMemo } from "react";
import styles from './styles.module.css';
import { nanoid } from 'nanoid';


function OptionCount () {
    let option = [];
    for (let i = 1; i <= 10; i++) {
      option.push(<option value={i} key={i}>{i}</option>);
    }
    return option;
}

function CartItem ({item}) {
    const prod = item.item;
    const [selects, setSelects] = useState(1);
    const price = useMemo(() => prod.price*selects, [prod, selects]);
    const discount = useMemo(() => (price/100*35), [price]);
    const afterDiscount = useMemo(() => (price - discount), [price, discount]);
    const [x, setX] = useState(true);
    return (
        <div className={styles.cartItemWrapper}>
            <div className={styles.itemDescription}>
                <div><input type="checkbox" checked={x} onChange={() => setX(!x)} /></div>
                <img src={prod.image} alt={prod.name} />
                <div>
                    <h3>{prod.name}</h3>
                    <p className={styles.lightGray}>цвет {prod.color}, {prod.weight}</p>
                </div>
            </div>
            <div className={styles.itemPrice}>
                <h3 className={styles.bold}>{afterDiscount} ₽</h3>
                <h3 className={styles.red}><span>{price} ₽</span> Скидка {discount} ₽</h3>
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
