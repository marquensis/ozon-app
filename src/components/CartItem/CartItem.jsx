import React, { useState, useMemo } from "react";
import styles from './CartItem.module.css';


function OptionCount () {
    let content = [];
    for (let i = 1; i <= 10; i++) {
      content.push(<option value={i} key={i}>{i}</option>);
    }
    return content;
}

function CartItem (props) {
    const [selects, setSelects] = useState(1);
    const {item} = props;
    // const itemImage = require(`${item.image}`);
    const price = useMemo(() => item.price*selects);
    const discount = useMemo(() => (price/100*35));
    const afterDiscount = useMemo(() => (price - discount));
    const [x, setX] = useState(true);
    return (
        <div className={styles['cart-item-wrapper']}>
            <div className={styles['item-description']}>
                <div><input type="checkbox" checked={x} onChange={() => setX(!x)} /></div>
                {/* <img src="" alt={item.name} /> */}
                <div>
                    <h3>{item.name}</h3>
                    <p style={{color:'lightgray'}}>цвет {item.color}, {item.weight}</p>
                </div>
            </div>
            <div className={styles['item-price']}>
                <h3 style={{fontWeight:'bold'}}>{afterDiscount} ₽</h3>
                <h3 style={{color:'red'}}><span>{price} ₽</span> Скидка {discount} ₽</h3>
            </div>
            <div className={styles['item-count']}>
                <select value={selects} onChange={e => setSelects(e.target.value)}>
                    <OptionCount />
                </select>
            </div>
        </div>
    )
}


export default CartItem;
