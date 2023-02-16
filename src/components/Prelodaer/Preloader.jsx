import React from "react";
import styles from './styles.module.css';
import { useSelector } from "react-redux";

function Preloader() {
      const idsGettingError = useSelector(state => state.itemsAndIds.errorIds);
      const itemsGettingError = useSelector(state => state.itemsAndIds.errorItems);
      let error;
      if (idsGettingError !== '' || itemsGettingError !== '') {
          error = idsGettingError + itemsGettingError;
      }
      const preloaderDisplay = '' + useSelector(state => state.preloader.displayPreloader);
    return (
        <div className={styles[preloaderDisplay]}>
            {error ? <h1 className={styles.bad}>Сервер не отвечает. Пожалуйста, попробуйте позже...</h1> : <div className={styles.loaderWrapper}><div className={styles.loader}>Идет загрузка ваших товаров. Подождите...</div></div>}
        </div>
    )
}

export default Preloader;