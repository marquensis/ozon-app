import React, { useState } from "react";
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { resetCartValue } from "../../Store/actions/cartItemsActions";
import { updateActualTotal } from "../../Store/actions/totalActions";
import { useDispatch, useSelector } from "react-redux";


function CartItem ({item}) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);
    let option = [];

    for (let i = 1; i <= 10; i++) {
      option.push(<option value={i} key={i}>{i}</option>);
    }
    
    const [selects, setSelects] = useState(item.value);

    const changeVal = (event) => {
        dispatch(resetCartValue(cartItems, item.id, event.target.value));
        dispatch(updateActualTotal(cartItems));
        setSelects(event.target.value);
    }

    const [deleteItemCheckbox, setDeleteItemCheckbox] = useState(true);
    return (
        <div className={styles.cartItemWrapper}>
            <div className={styles.itemDescription}>
                <div><input type="checkbox" checked={deleteItemCheckbox} onChange={() => setDeleteItemCheckbox(!deleteItemCheckbox)} /></div>
                <img src={item.image} alt={item.name} />    
                <div>
                    <h3>{item.name}</h3>
                    <p className={styles.lightGray}>цвет {item.color}, {item.updatedWeight}гр</p>
                </div>
            </div>
            <div className={styles.itemPrice}>  
                <h3 className={styles.bold}>{item.totalPrice} ₽</h3>
                <h3 className={styles.red}><span>{item.updatedPrice} ₽</span> Скидка {item.updatedDiscount} ₽</h3>
            </div>
            <div className={styles.itemCount}>
                <select 
                    className={styles.select} 
                    value={selects} 
                    onChange={changeVal}>
                    {option}
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
        value: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        updatedPrice: PropTypes.number.isRequired,
        updatedWeight: PropTypes.number.isRequired,
        updatedDiscount: PropTypes.number.isRequired,
        totalPrice: PropTypes.number.isRequired,
    }),
}


export default CartItem;
