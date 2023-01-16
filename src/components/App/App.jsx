import React, { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import LoginWindow from "../LoginWindow/LoginWindow";
import Preloader from "../Prelodaer/Preloader";
import { Provider } from 'react-redux';
import "swiper/css/bundle";
import AllItemsContext from "../../contexts/ContextAllItems";
import store from "../../reducers/Store";

// yarn mb start --configfile api.ejs



function App () {
    // Отключение бесконечного реднера
    const [removeRenderItems, setRemoveRenderItems] = useState(false);
    const [removeRenderIds, setRemoveRenderIds] = useState(false);

    // Задание списка товаров и айди товаров
    const [allItems, setAllItems] = useState([]);
    const [cartItemsId, setCartItemsId] = useState([]);

    
    const [error, setError] = useState();
    // Получение списка товаров по апи
    const getAllItems = async () => {
        const results = [];
        let morePages = true;
        let currentPage = 0;
        try {
            while(morePages) {
                currentPage++;
                const response = await fetch(`http://localhost:3001/api/v1/goods?page=${currentPage}`);
                let data = await response.json();
                results.push(...data.goods);
                morePages = currentPage < 2;
            }
            setRemoveRenderItems(true);
            return setAllItems(results);
        } catch (error) {
            setError(error.message);
        }
    }

    // Получение списка айди по апи
    const getCartItemId = async () => {
        let results = [];
        try {
            const response = await fetch(`http://localhost:3001/api/v1/cart`);
            let data = await response.json();
            const ids = data.cart.map(o => o.id);
            results = data.cart.filter(({id}, index) => !ids.includes(id, index + 1)).sort((a,b) => a.id > b.id ? -1 : 1);
            setRemoveRenderIds(true);
            return setCartItemsId(results);
        } catch (error) {
            setError(error.message);
        }
    }

    if (!removeRenderItems) {
        getAllItems();
    }

    if (!removeRenderIds) {
        getCartItemId();
    }

    return (
        <>
        <Provider store={store}>
            {(!removeRenderIds || !removeRenderItems) ? 
                <Preloader error={error} /> : 
                <>
                    <LoginWindow />
                    <AppHeader/>
                    <AllItemsContext.Provider value={allItems}>
                        <ShoppingCart cartId={cartItemsId} />
                        <RecommendedList />
                    </AllItemsContext.Provider>
                </>
            }
        </Provider>
        </>
    )
}
export default App;