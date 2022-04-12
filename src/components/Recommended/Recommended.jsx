import React, { useEffect } from "react";
import styles from './styles.module.css';
// import items from '../../fixtures/fixtures';
import RecomendItem from '../RecomendItem/RecomendItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { nanoid } from 'nanoid';


function RecItemList ({list}) {
    const keyCode = [];
    useEffect(() => {
        list.map(el => keyCode.push(nanoid()));
    });
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
            {list.map((el, keyCode) => <SwiperSlide key={keyCode}><RecomendItem item={el}/></SwiperSlide>)}
        </Swiper>
    );
}

function RecommendedList ({rec}) {
    return (
        <div className={styles.recommended}>
            <div className={styles.content}>
                <h1>Рекомендуем</h1>
                <RecItemList list={rec}/>
            </div>
        </div>
    )
}
export default RecommendedList;