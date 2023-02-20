import React from 'react';
import styles from './styles.module.css';
import Modal from '../ModalBase/ModalBase';
import Logo from './ozon_logo.png';

function LoginWindow () {
    return (
        <Modal>
            <div className={styles.ozonLogo}>
                    <img src={ Logo } alt="ozon-logo" />
                    <span>ID</span>
            </div>
            <div className={styles.windowText}>
                <h3>Войдите по почте</h3>
                <p>Только для зарегистрированных пользователей</p>
            </div>
            <div className={styles.windowForm}>
                <form className={styles.emailField}>
                    <input type='text' placeholder="Электронная почта"/>
                    <button type="submit">Получить код</button>
                </form>
            </div>
        </Modal>
    )
}
LoginWindow.componentName = 'login';
export default LoginWindow;