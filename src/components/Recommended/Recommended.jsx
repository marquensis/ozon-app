import React from "react";
import styles from './Recommended.module.css';
// import items from '../../fixtures/fixtures';
import RecomendItem from '../RecomendItem/RecomendItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";


function RecItemList ({list}) {
    return (
        <Swiper
            navigation={true} 
            modules={[Navigation]}
            className={styles['recommended-wrapper']}
            spaceBetween={0}
            slidesPerView={5}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            >
            {list.map(el => <SwiperSlide><RecomendItem item={el} key={el}/></SwiperSlide>)}
        </Swiper>
    );
}

function RecommendedList ({rec}) {
    return (
        <div className={styles['recommended']}>
            <div className={styles['content']}>
                <h1>Рекомендуем</h1>
                <RecItemList list={rec}/>
            </div>
        </div>
    )
}
export default RecommendedList;