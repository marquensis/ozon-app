import React from "react";
import styles from './styles.module.css';
import Like from './like_icon.png';
import Orders from './orders_icon.png';
import Logo from './ozon_logo.png';
import Search from './search_icon.png';
import Shopbag from './shopbag_icon.png';
import Login from './login_icon.png';
import { useDispatch, useSelector } from "react-redux";
import { modalShow } from "../../store/actions/modalActions";
import { login } from "../../store/constants/constants";

function AppHeader () {
    // Открыть модалку логина
    const dispatch = useDispatch();
    const total = useSelector(state => state.cart.totalCount);

    return (
        <div className={styles.navBar}>
            <div className={styles.content}>
                <div className={styles.ozonLogo}>
                    <a href="/"><img src={ Logo } alt="ozon-logo" /></a>
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
                        <button type="submit"><img src={ Search } alt="Search" /></button>
                    </form>
                </div>
                <div className={styles.navButtons}>
                    <div className={styles.navButton} onClick={() => dispatch(modalShow(login))}>
                        <img src={ Login } alt="Orders" />
                        <p>Войти</p>
                    </div>
                    <div className={styles.navButton}>
                        <img src={ Orders } alt="Orders" />
                        <p>Заказы</p>
                    </div>
                    <div className={styles.navButton}>
                        <img src={ Like } alt="Liked" />
                        <p>Избранное</p>
                    </div>
                    <div className={styles.navButton}>
                        <span>{total.value}</span>
                        <img src={ Shopbag } alt="Cart" />
                        <p>Корзина</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AppHeader;