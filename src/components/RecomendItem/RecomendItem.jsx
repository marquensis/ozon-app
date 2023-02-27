import React from "react";
import styles from './styles.module.css';
import Like from './like_icon.png';
import PropTypes from 'prop-types';

function RecomendItem ({item}) {
    return (
        <div className={styles.recomItemWrapper}>
            <div className={styles.topWrap}>
                <div className={styles.like}><img src={ Like } alt='like' /></div>
                <span>- {item.discount}%</span>
                <div className={styles.recImage}><img src={item.image} alt={item.name} /></div>
            </div>
            <div className={styles.midWrap}>
                <p className={styles.price}>{item.totalPrice} ₽ <span>{item.price} ₽</span></p>
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
    item: PropTypes.shape({
        color: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        totalPrice: PropTypes.number.isRequired,
    }),
}

export default RecomendItem;