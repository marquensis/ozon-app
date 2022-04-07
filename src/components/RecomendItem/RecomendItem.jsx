import React, { useMemo } from "react";
import styles from './RecomendItem.module.css';

function RecomendItem (props) {
    const {item} = props;
    const price = useMemo(() => item.price);
    const percent = 35;
    const discountPerc = useMemo(() => (price/100*percent));
    const redPrice =useMemo(() =>  price - discountPerc);
    return (
        <div className={styles['recom-item-wrapper']}>
            <div className={styles['top-wrap']}>
                <div className={styles['like']}><img src={require('../assets/like_icon.png')} alt='like' /></div>
                <span>- {percent}%</span>
                <div className={styles['rec-image']}></div>
            </div>
            <div className={styles['mid-wrap']}>
                <p className={styles['price']}>{redPrice} ₽ <span>{price} ₽</span></p>
                <p>{item.name}</p>
                <span>★★★★★</span>
            </div>
            <div className={styles['bot-wrap']}>
                <button>В корзину</button>
            </div>
        </div>
    )
}


export default RecomendItem;