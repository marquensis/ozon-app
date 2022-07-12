import React from "react";
import styles from './styles.module.css';

function Preloader(er) {
    return (
        <div>
            {er ? <h1 className={styles.bad}>502 Bad Gateway</h1> : <div className={styles.loaderWrapper}><div className={styles.loader}>Идет загрузка ваших товаров. Подождите...</div></div>}
        </div>
    )
}

export default Preloader;