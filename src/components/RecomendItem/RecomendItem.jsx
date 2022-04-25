import React, { useMemo } from "react";
import styles from './styles.module.css';
import Like from './like_icon.png';
import PropTypes from 'prop-types';
import RecommendedShapes from "../../shapes/RecShapes";

function RecomendItem ({item}) {
    const price = item.price;
    const percent = 35;
    const discountPerc = useMemo(() => (price/100*percent), [price, percent]);
    const redPrice =useMemo(() =>  price - discountPerc, [price, discountPerc]);
    return (
        <div className={styles.recomItemWrapper}>
            <div className={styles.topWrap}>
                <div className={styles.like}><img src={ Like } alt='like' /></div>
                <span>- {percent}%</span>
                <div className={styles.recImage}><img src={item.image} alt={item.name} /></div>
            </div>
            <div className={styles.midWrap}>
                <p className={styles.price}>{redPrice} ₽ <span>{price} ₽</span></p>
                <p>{item.name}</p>
                <span>★★★★★</span>
            </div>
            <div className={styles.botWrap}>
                <button>В корзину</button>
            </div>
        </div>
    )
}

RecomendItem.propTypes = {
    item: PropTypes.shape(RecommendedShapes),
}

export default RecomendItem;