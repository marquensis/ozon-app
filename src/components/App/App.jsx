import React, { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import LoginWindow from "../LoginWindow/LoginWindow";
import Preloader from "../Prelodaer/Preloader";
import "swiper/css/bundle";
import { getIds, getItems } from "../../Store/actions/apiQueries";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// yarn mb start --configfile api.ejs


function App () {

    const dispatch = useDispatch();

    // отключение бесконечного лоадера
    const removeRenderIds = useSelector(state => state.isFetchingIds);
    const removeRenderItems = useSelector(state => state.isFetchingItems);

    // получение данных апи
    useEffect(() => {
        if (removeRenderItems) {
            dispatch(getItems());
        }
        if (removeRenderIds) {
            dispatch(getIds());
        }
    }, [removeRenderIds, removeRenderItems, dispatch])

    return (
        <>
        {(removeRenderIds || removeRenderItems) ? 
            <Preloader /> : 
            <>
                <LoginWindow />
                <AppHeader/>
                <ShoppingCart />
                <RecommendedList />
            </>
        }
        </>
    )
}
export default App;