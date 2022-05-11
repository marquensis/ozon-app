import React, { useState, useMemo, useEffect, useContext } from "react";
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import CartChangesContext from "../../contexts/ContextCartChanges";

function OptionCount () {
    let option = [];
    for (let i = 1; i <= 10; i++) {
      option.push(<option value={i} key={i}>{i}</option>);
    }
    return option;
}

function CartItem ({item}) { 
    const [selects, setSelects] = useState(1);
    const price = useMemo(() => item.price*selects, [item, selects]);
    const updatedWeight = useMemo(() => item.weight*selects, [item, selects]);
    const discount = useMemo(() => (price/100*35), [price]);
    const afterDiscount = useMemo(() => (price - discount), [price, discount]);
    const [x, setX] = useState(true);

    // Изменение значения в итогово1 корзине
    const {totalWeight, setWeight} = useContext(CartChangesContext);
    const {totalCount, setCount} = useContext(CartChangesContext);
    const {totalPrice, setPrice} = useContext(CartChangesContext);
    const {totalDiscount, setDiscount} = useContext(CartChangesContext);
    useEffect(() => {
        setWeight(totalWeight + updatedWeight);
        setCount(selects >= selects ? totalCount + Number(selects) : totalCount - Number(selects));
        setPrice(totalPrice + afterDiscount);
        setDiscount(totalDiscount + discount);
    }, [selects])

    return (
        <div className={styles.cartItemWrapper}>
            <div className={styles.itemDescription}>
                <div><input type="checkbox" checked={x} onChange={() => setX(!x)} /></div>
                <img src={item.image} alt={item.name} />    
                <div>
                    <h3>{item.name}</h3>
                    <p className={styles.lightGray}>цвет {item.color}, {updatedWeight}гр</p>
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

CartItem.propTypes = {
    item: PropTypes.shape({
        color: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
    }),
}


export default CartItem;
