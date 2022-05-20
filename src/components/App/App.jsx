import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import cartItemsId from "../../fixtures/cart-item-id";
import recItems from "../../fixtures/fixtures";
import "swiper/css/bundle";
import ShowHideContext from "../../contexts/ContextView";
import LoginWindow from "../LoginWindow/LoginWindow";
import AllItemsContext from "../../contexts/ContextAllItems";


const ITEMS_API = 'http://localhost:3001/api/v1/goods?page=1';
const CART_ITEMS = 'cart';

const getAllItems = async () => {
    const results = [];
    let morePages = true;
    let currentPage = 0;

    while(morePages) {
        currentPage++;
        const response = await fetch(`http://localhost:3001/api/v1/goods?page=${currentPage}`);
        let data = await response.json();
        results.push(...data.goods);
        morePages = currentPage < 2;
    }
    return results;
}

function App () {
    const [view, setView] = useState('hide');
    const items = [];
    useEffect(() => {
        const allItems = async () => {
            const getItems = await getAllItems();
            getItems.map(el => items.push(el));
        }  
        allItems();
    }, [])
    return (
        <>  
            <ShowHideContext.Provider value={{view, setView}}>
                <LoginWindow />
                <AppHeader/>
                <AllItemsContext.Provider value={true}>
                    <ShoppingCart cartId={cartItemsId} rec={recItems}/>
                    <RecommendedList rec={items}/>
                </AllItemsContext.Provider>
            </ShowHideContext.Provider>
        </>
    )
}
export default App;