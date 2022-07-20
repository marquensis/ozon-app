import React, { useMemo, useContext } from "react";
import styles from './styles.module.css';
import RecomendItem from '../RecomendItem/RecomendItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import RecommendedShapes from "../../shapes/RecShapes";
import AllItemsContext from "../../contexts/ContextAllItems";

function RecItemList ({list}) {
    return (
        <Swiper
            navigation={true} 
            modules={[Navigation]}
            className={styles.recommendedWrapper}
            spaceBetween={0}
            slidesPerView={5}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => (swiper)}
            >
            {list.length && list.map(el => (typeof(el) === 'object') ? <SwiperSlide key={el.key}><RecomendItem item={el}/></SwiperSlide> : '')}
        </Swiper>
    );
}

function RecommendedList () {
    const recItems = useContext(AllItemsContext)
    const itemList = useMemo(() => recItems.map((item) => {
        return { ...item, ...{key: nanoid()}, ...{totalPrice: item.price - (item.price / 100 * item.discount)} };
    }), [recItems]);
    return (
        <div className={styles.recommended}>
            <div className={styles.content}>
                <h1>Рекомендуем</h1>
                <RecItemList list={itemList}/>
            </div>
        </div>
    )
}
RecItemList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            weight: PropTypes.number.isRequired,
            discount: PropTypes.number.isRequired,
            totalPrice: PropTypes.number.isRequired,
        })
    ),
}
RecommendedList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            rec: PropTypes.arrayOf(RecommendedShapes).isRequired,
            key: PropTypes.string.isRequired,
        })
    ),
}
export default RecommendedList; 