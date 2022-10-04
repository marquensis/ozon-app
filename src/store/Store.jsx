import React from 'react';
import createStore from 'redux';

function Store () {
    const store = createStore(() => {}, {});
    console.log('store is: ',store);
}

export default Store;
