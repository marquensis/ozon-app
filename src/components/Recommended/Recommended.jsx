import React, { useMemo } from "react";
import styles from './styles.module.css';
// import items from '../../fixtures/fixtures';
import RecomendItem from '../RecomendItem/RecomendItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import RecShapes from "../../shapes/RecShapes";


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
            {list.map(el => <SwiperSlide key={el.key}><RecomendItem item={el}/></SwiperSlide>)}
        </Swiper>
    );
}

function RecommendedList ({rec}) {
    const itemList = useMemo(() => rec.map((item) => {
        return { ...item, ...{key: nanoid()} };
    }), [rec]);
    return (
        <div className={styles.recommended}>
            <div className={styles.content}>
                <h1>Рекомендуем</h1>
                <RecItemList list={itemList}/>
            </div>
        </div>
    )
}
RecommendedList.propTypes = {
    rec: PropTypes.array.isRequired,
}
RecItemList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            item: PropTypes.arrayOf(RecShapes),
        })
    ).isRequired,
}
export default RecommendedList;