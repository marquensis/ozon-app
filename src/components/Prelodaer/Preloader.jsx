import React from "react";
import styles from './styles.module.css';
import { useSelector } from "react-redux";
import { onPreloader } from "../../store/actions/preloaderActions";

function Preloader() {  
    const {cartItemId} = useSelector(state => state.cartIds);
    const {allItems} = useSelector(state => state.allItems);
    if(allItems.length === 0 || cartItemId === 0) {
        onPreloader();
    }
    const preloaderDisplay = '' + useSelector(state => state.preloader.displayPreloader);
    return (
        <div className={styles[preloaderDisplay]}>
           <div className={styles.loaderWrapper}><div className={styles.loader}>Идет загрузка ваших товаров. Подождите...</div></div>
        </div>
    )
}

export default Preloader;