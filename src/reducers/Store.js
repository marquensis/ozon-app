import { legacy_createStore as createStore } from 'redux';

export const HIDE = 'hide';
export const SHOW = 'show';

// action
export const defaultState = {
  view: HIDE
};

// reducer
export const showHideModal = (state = defaultState, action) => {
  switch(action.type) {
    case 'CHANGE_MODAL':
      return {...state, view: action.payload};
    default:
      return state;
  }
}

// store
const store = createStore(showHideModal, defaultState);

store.subscribe(() => console.log(store.getState()));

export default store;