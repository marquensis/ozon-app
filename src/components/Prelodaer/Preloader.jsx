import React from "react";
import styles from './styles.module.css';
import { useSelector } from "react-redux";

function Preloader() {  
 
    const preloaderDisplay = '' + useSelector(state => state.preloader.displayPreloader);
    return (
        <div className={styles[preloaderDisplay]}>
            <div className={styles.loaderWrapper}><div className={styles.loader}>Идет загрузка ваших товаров. Подождите...</div></div>
        </div>    
    )
}

export default Preloader;