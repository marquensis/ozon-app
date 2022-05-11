import React, {useContext} from 'react';
import styles from './styles.module.css';
import Logo from './ozon_logo.png';
import ShowHideContext from '../../contexts/ContextView';

function LoginWindow () {
    
    const {view, setView} = useContext(ShowHideContext);

    const change = () => {
        setView(view === 'hide' ? 'show' : 'hide');
    }
    return (
        <div className={styles.windowWrapper}>
            <div className={styles.windowHead}>
                <div className={styles.ozonLogo}>
                        <img src={ Logo } alt="ozon-logo" />
                        <span>ID</span>
                </div>
                <button type='close' onClick={change}>x</button>
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
        </div>
    )
}

export default LoginWindow;