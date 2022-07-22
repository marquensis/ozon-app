import React from "react";
import styles from './styles.module.css';

function Preloader(error) {
    return (
        <div>
            {error ? <h1 className={styles.bad}>Сервер не отвечает. Пожалуйста, попробуйте позже...</h1> : <div className={styles.loaderWrapper}><div className={styles.loader}>Идет загрузка ваших товаров. Подождите...</div></div>}
        </div>
    )
}

export default Preloader;