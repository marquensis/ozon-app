import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { 
  HIDE, 
  CHANGE_MODAL, 
  ADD_CART_ITEM_ID, 
  ADD_ALL_ITEMS, 
  ADD_ITEMS_FAILURE, 
  ADD_IDS_FAILURE, 
  CHANGE_CART_ITEMS, 
  UPDATE_TOTAL
} from '../types/types';

// default state
export const defaultState = {
  view: HIDE,
  isFetchingIds: true,
  isFetchingItems: true, 
  cartItemId: [],
  cartItems: [],
  totalCount: [{
    weight: 0,
    count: 0,
    price: 0,
    totalPrice: 0,
    discount: 0,
  }],
  allItems: [], 
  errorItems: '',
  errorIds: ''
};

// reducer
export const mainReducer = (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_MODAL:
      return {...state, view: action.payload};

    case ADD_CART_ITEM_ID:
      return {
        ...state, 
        isFetchingIds: false, 
        cartItemId: action.payload
      };

    case ADD_ALL_ITEMS:
      return {
          ...state, 
          isFetchingItems: false, 
          allItems: action.payload
        };

    case ADD_ITEMS_FAILURE:
      return {
        ...state,
        isFetchingItems: true, 
        errorItems: action.payload.errorItems
      };

    case ADD_IDS_FAILURE:
      return {
        ...state,
        isFetchingIds: true, 
        errorIds: action.payload.errorIds
      };

    case CHANGE_CART_ITEMS:
      return {...state, cartItems: action.payload};

    case UPDATE_TOTAL:
      return {...state, totalCount: action.payload};

    default:
      return state;
  }
}

// store
const store = createStore(mainReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

export default store;