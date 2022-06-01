import React from "react";
import styles from './styles.module.css';

function Preloader() {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader}>Идет загрузка ваших товаров. Подождите...</div>
        </div>
    )
}

export default Preloader;