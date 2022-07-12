import React, { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import LoginWindow from "../LoginWindow/LoginWindow";
import Preloader from "../Prelodaer/Preloader";
// import cartItemsId from "../../fixtures/cart-item-id";
// import recItems from "../../fixtures/fixtures";
import "swiper/css/bundle";
import ShowHideContext from "../../contexts/ContextView";
import AllItemsContext from "../../contexts/ContextAllItems";

// yarn mb start --configfile api.ejs

function App () {
    // Отключение бесконечного реднера
    const [removeRenderItems, setRemoveRenderItems] = useState(false);
    const [removeRenderIds, setRemoveRenderIds] = useState(false);

    // Задание списка товаров и айди товаров
    const [allItems, setAllItems] = useState([]);
    const [cartItemsId, setCartItemsId] = useState([]);


    const [er, setEr] = useState();
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
            setEr(error.message);
        }
    }

    // Получение списка айди по апи
    const getCartItemId = async () => {
        const results = [];
        try {
            const response = await fetch(`http://localhost:3001/api/v1/cart`);
            let data = await response.json();
            results.push(...data.cart);
            setRemoveRenderIds(true);
            return setCartItemsId(results);
        } catch (error) {
            setEr(error.message);
        }
    }

    // Изменение состояния модалки с логином
    const [view, setView] = useState('hide');


    if (!removeRenderItems) {
        getAllItems();
    }

    if (!removeRenderIds) {
        getCartItemId();
    }

    return (
        <>
            {(!removeRenderIds || !removeRenderItems) ? <Preloader er={er} /> : <ShowHideContext.Provider value={{view, setView}}>
                                                                            <LoginWindow />
                                                                            <AppHeader/>
                                                                            <AllItemsContext.Provider value={allItems}>
                                                                                <ShoppingCart cartId={cartItemsId}/>
                                                                                <RecommendedList rec={allItems}/>
                                                                            </AllItemsContext.Provider>
                                                                        </ShowHideContext.Provider>}
        </>
    )
}
export default App;
