import React, { useMemo, useState, useContext } from "react";
import styles from './styles.module.css';
import CartItem from '../CartItem/CartItem';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import RecommendedShapes from "../../shapes/RecShapes";
import CartShapes from "../../shapes/CartShapes";
import ShowHideContext from "../../contexts/ContextView";
import CartChangesContext from "../../contexts/ContextCartChanges";

function CartItemList ({list}) {
    return (
        <div className={styles.leftBody}>
            {list.length && list.map((el) => (el.id !== undefined) ? <CartItem item={el} key={el.key}/> : '')}
        </div>
    );
}

function ShoppingCart ({cartId, rec}) {
    const [values, setValue] = useState([]);
    if (rec.length !== 0) {
        setValue(rec.map(item => item));
    }
    const resetVal = (itemId, newVal) => {
        const recid = rec.map(recVal => recVal.id);
        setValue(values.map(item => {
            for (itemId of recid) return {...item, value: newVal};
        }));
        console.log(values);
    }
    const itemList = useMemo(() => cartId.map((item) => {
        const equalId = rec.find(recVal => item.id === recVal.id);
        
        const value = (equalId === undefined) ? 0 : resetVal(item.id ,5);
        const price = (equalId === undefined) ? 0 : equalId.price * value;
        const weight = (equalId === undefined) ? 0 : equalId.weight * value;
        const discount = (equalId === undefined) ? 0 : price / 100 * equalId.discount;
        const totalPrice = (equalId === undefined) ? 0 : equalId.price - discount;
        
        return (equalId === undefined) ? {} : { 
                 ...item, 
                 ...equalId, 
                 ...{key: nanoid()},
                 ...{newvalue: value},
                 ...{updatedPrice: price},
                 ...{updatedWeight: weight},
                 ...{updatedDiscount: discount},
                 ...{totalPrice: totalPrice} 
            };
    }), [cartId, rec]);
    
    // Изменение итоговых значений в корзине
    const [total, setTotal] = useState({
        weight: itemList.reduce((prev, current) => { return prev + current.weight}, 0),
        count: itemList.reduce((prev, current) => { return prev + current.value}, 0),
        price: itemList.reduce((prev, current) => { return prev + current.price}, 0),
        totalPrice: itemList.reduce((prev, current) => { return prev + current.price}, 0),
        discount: 0,
    });

    // State меняющий значение в чекбоксе "Выбрать все"
    const [x, setX] = useState(true);

    // Кнопка открытия логин окна
    const {view, setView} = useContext(ShowHideContext);

    return (
        <CartChangesContext.Provider value={{resetVal}}>
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
                            <CartItemList list={itemList} />
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