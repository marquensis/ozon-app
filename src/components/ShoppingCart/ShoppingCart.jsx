import React, { useMemo, useState, useContext, useEffect } from "react";
import styles from './styles.module.css';
import CartItem from '../CartItem/CartItem';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import RecommendedShapes from "../../shapes/RecShapes";
import CartShapes from "../../shapes/CartShapes";
import ShowHideContext from "../../contexts/ContextView";
import CartChangesContext from "../../contexts/ContextCartChanges";

function CartItemList ({list, resetVal}) {
    return (
        <div className={styles.leftBody}>
            {list.length !== 0 && list.map((el) => (el.id !== undefined) ? <CartItem item={el} key={el.key} resetVal={resetVal}/> : '')}
        </div>
    );
}

function ShoppingCart ({cartId, rec}) {

    const valuesArr = [];
    for (let i = 0; i < cartId.length; i ++){
        valuesArr[i] = {id : cartId[i].id, value : 1};
    }

    const [value, setValue] = useState([]);

    useEffect(()=>{
        setValue(valuesArr);
    },[])
    const preList = useMemo(() => cartId.map((item) => {
        const equalId = rec.find(recVal => item.id === recVal.id);
        const result = (equalId === undefined) ? {} : { 
            ...item, 
            ...equalId, 
            ...{key: nanoid()}
        };
        return result;

    }), [cartId, rec]);

    const itemList = useMemo(() => preList.map((item) => {
        const val = value[item.id] !== undefined ? value[item.id].value : 1;
        const result = { 
            ...item, 
            ...{newvalue: val},
            ...{updatedPrice: item.price * val},
            ...{updatedWeight: item.weight * val},
            ...{updatedDiscount: (item.price * val) * item.discount / 100},
            ...{totalPrice: (item.price * val) - (item.price * val) * item.discount / 100}
        };
        return result;

    }), [value, preList]);
    
    // Функция изменения количества товаров
    const resetVal = (itemId, newVal) => {
        const newarr = value;   
        newarr.forEach((el, id) => {
            itemId === newarr[id].id ? value[id].value=+newVal : value[id].value=el.value;
        });
        setValue(newarr);
    };
    
    // Изменение итоговых значений в корзине
    const [total, setTotal] = useState({
        weight: 0,
        count: 0,
        price: 0,
        totalPrice: 0,
        discount: 0,
    });

    useEffect(()=>{
        setTotal({
            weight: itemList.reduce((prev, current) => { return prev + current.updatedWeight}, 0),
            count: itemList.reduce((prev, current) => { return prev + current.newvalue}, 0),
            price: itemList.reduce((prev, current) => { return prev + current.updatedPrice}, 0),
            totalPrice: itemList.reduce((prev, current) => { return prev + current.updatedDiscount}, 0),
            discount: itemList.reduce((prev, current) => { return prev + current.totalPrice}, 0),
        })
    },[itemList])

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
                                    <input type="checkbox" checked={x} onChange={() => setX(!x)} />
                                    <span>Выбрать все</span>
                                    <span className={styles.red}>Удалить выбранное</span>
                                </div>
                            </div>
                            <CartItemList list={itemList}  resetVal={resetVal}/>
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
                            <hr />
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
CartItemList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
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
            totalPrice: PropTypes.number.isRequired,
            updatedDiscount: PropTypes.number.isRequired,
        })
    ),
}
ShoppingCart.propTypes = {
    rec: PropTypes.arrayOf(RecommendedShapes).isRequired,
    cartId: PropTypes.arrayOf(CartShapes).isRequired,
}
export default ShoppingCart;