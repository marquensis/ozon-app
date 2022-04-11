import React from "react";
import styles from './AppHeader.module.css';
import CountItems from '../constants';

function AppHeader () {
    
    return (
        <div className={styles.navBar}>
            <div className={styles.content}>
                <div className={styles.ozonLogo}>
                    <a href="/"><img src={ require('./ozon_logo.png') } alt="ozon-logo" /></a>
                </div>
                <div className={styles.searchBar}>
                    <label className={styles.searchPlace}>
                        <select defaultValue={'everywhere'}>
                            <option value='everywhere'>Везде</option>
                            <option value='here'>Тут</option>
                            <option value='there'>Там</option>
                        </select>
                    </label>
                    <form className={styles.searchField}>
                        <input type='text' placeholder="Искать на Ozon"/>
                        <button type="submit"><img src={ require('./search_icon.png') } alt="Search" /></button>
                    </form>
                </div>
                <div className={styles.navButtons}>
                    <div className={styles.navButton}>
                        <img src={ require('./orders_icon.png') } alt="Orders" />
                        <p>Заказы</p>
                    </div>
                    <div className={styles.navButton}>
                        <img src={ require('./like_icon.png') } alt="Liked" />
                        <p>Избранное</p>
                    </div>
                    <div className={styles.navButton}>
                        <span>{CountItems}</span>
                        <img src={ require('./shopbag_icon.png') } alt="Cart" />
                        <p>Корзина</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AppHeader;