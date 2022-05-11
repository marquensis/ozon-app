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
            {list.length && list.map((el) => (typeof(el) === 'object') ? <CartItem item={el} key={el.key}/> : '')}
        </div>
    );
}

function ShoppingCart ({cartId, rec}) {
    // Изменение итоговых значений в корзине
    const [totalWeight, setWeight] = useState(0);
    const [totalCount, setCount] = useState(0);
    const [totalPrice, setPrice] = useState(0);
    const [totalDiscount, setDiscount] = useState(0);

    // Создание списка товаров с учетом уникального айди и содержимого товара
    const itemList = useMemo(() => cartId.map((item) => {
        const equalId = rec.find(recVal => recVal.id === item.id);
        return { ...item, ...equalId, ...{key: nanoid()} };
    }), [cartId, rec]);


    // State меняющий значение в чекбоксе "Выбрать все"
    const [x, setX] = useState(true);

    // Кнопка открытия логин окна
    const {view, setView} = useContext(ShowHideContext);
    const change = () => {
        setView(view === 'hide' ? 'show' : 'hide');
    }

    return (
        <CartChangesContext.Provider value={{totalWeight, setWeight, totalCount, setCount, totalPrice, setPrice, totalDiscount, setDiscount}}>
            <div className={styles.cart}>
                <div className={styles.content}>
                    <div className={styles.cartHead}>
                        <span>{totalCount}</span>
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
                            <CartItemList list={itemList}/>
                        </div>
                        <div className={styles.cartRight}>
                        <div className={styles.rightGreenButton}>
                            <button onClick={change}>Перейти к оформлению</button>
                        </div>
                        <div className={styles.rightSum}>
                            <div className={styles.sumCount}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Ваша корзина</th>
                                            <td>{totalCount} товар * {totalWeight}гр</td>
                                        </tr>
                                        <tr>
                                            <td>Товары ({totalCount})</td>
                                            <td className={styles.bolder}>{totalPrice} ₽</td>
                                        </tr>
                                        <tr>
                                            <td>Скидка</td>
                                            <td className={`${styles.bolder} ${styles.red}`}>- {totalDiscount} ₽</td>
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
                                            <th>{totalPrice} ₽</th>
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
        })
    ),
}
ShoppingCart.propTypes = {
    rec: PropTypes.arrayOf(RecommendedShapes).isRequired,
    cartId: PropTypes.arrayOf(CartShapes).isRequired,
}
export default ShoppingCart;