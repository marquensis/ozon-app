import React from "react";
import styles from './styles.module.css';
import { useSelector } from "react-redux";

function Preloader() {
      // ловим ошибку
      const idsGettingError = useSelector(state => state.errorIds);
      const itemsGettingError = useSelector(state => state.errorItems);
      let error;
      if (idsGettingError !== '' || itemsGettingError !== '') {
          error = idsGettingError + itemsGettingError;
      }
    return (
        <div>
            {error ? <h1 className={styles.bad}>Сервер не отвечает. Пожалуйста, попробуйте позже...</h1> : <div className={styles.loaderWrapper}><div className={styles.loader}>Идет загрузка ваших товаров. Подождите...</div></div>}
        </div>
    )
}

export default Preloader;