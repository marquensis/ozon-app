import React from 'react';
import { createStore } from 'redux';

function showHideModal (state = false, action) {
    switch (action.type) {
        case true:
          return state = true
        default:
          return state
    }
}

const store = createStore(showHideModal, [false]);

store.subscribe(() =>
  console.log(store.getState())
)

export default store;