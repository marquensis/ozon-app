import React from "react";
import styles from './RecomendItem.module.css';

function RecomendItem (props) {
    const {item} = props;
    const discountPerc = (item.price/100*35);
    const redPrice = item.price - (item.price/100*35);
    return (
        <div className={styles['recom-item-wrapper']}>
            <div className={styles['top-wrap']}>
                <div className={styles['like']}><img src={require('../assets/like_icon.png')} alt='like' /></div>
                <span>- {discountPerc}%</span>
                <div className={styles['rec-image']}></div>
            </div>
            <div className={styles['mid-wrap']}>
                <p className={styles['price']}>{redPrice} ₽ <span>{item.price} ₽</span></p>
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