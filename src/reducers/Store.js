import React from 'react';
import { createStore } from 'redux';

export const HIDE = 'hide';
export const SHOW = 'show';

export function showHideModal (state = HIDE, action) {
  switch(action.type) {
    case SHOW:
      return SHOW;
    case HIDE:
      return HIDE;
    default:
      return state;
  }
}

const store = createStore(showHideModal, HIDE);

store.subscribe(() =>
  console.log(store.getState())
);

export default store;