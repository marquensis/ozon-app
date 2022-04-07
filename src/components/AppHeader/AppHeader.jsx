import React from "react";
import styles from './AppHeader.module.css';
import CountItems from '../constants';

function AppHeader () {
    return (
        <div className={styles['nav-bar']}>
            <div className={styles['content']}>
                <div className={styles['ozon-logo']}>
                    <a href="https://www.ozon.ru/"><img src={ require('../assets/ozon_logo.png') } alt="ozon-logo" /></a>
                </div>
                <div className={styles['search-bar']}>
                    <label className={styles['search-place']}>
                        <select>
                            <option value='everywhere' selected>Везде</option>
                            <option value='here'>Тут</option>
                            <option value='there'>Там</option>
                        </select>
                    </label>
                    <form className={styles['search-field']}>
                        <input type='text' placeholder="Искать на Ozon"/>
                        <button type="submit"><img src={ require('../assets/search_icon.png') } alt="Search" /></button>
                    </form>
                </div>
                <div className={styles['nav-buttons']}>
                    <div className={styles['nav-button']}>
                        <img src={ require('../assets/orders_icon.png') } alt="Orders" />
                        <p>Заказы</p>
                    </div>
                    <div className={styles['nav-button']}>
                        <img src={ require('../assets/like_icon.png') } alt="Liked" />
                        <p>Избранное</p>
                    </div>
                    <div className={styles['nav-button']}>
                        <span>{CountItems}</span>
                        <img src={ require('../assets/shopbag_icon.png') } alt="Cart" />
                        <p>Корзина</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AppHeader;