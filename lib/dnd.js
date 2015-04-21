'use strict';
var list, productAttributes,

pickUpElement = function (e){
    // dragstart event
    productAttributes = e.target.dataset.attributes;
    console.log('@dnd.js : pickUpElement');
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.dropEffect = 'copy';
    return true;
},

neutraliseInterference = function(e) {
    // Prevent conflicts with default behaviour of dragover event 
    e.preventDefault();
    // e.stopPropagation();
},

receiveElement = function(e){
    // drop event
    // e.preventdefault();
    e.stopPropagation();

    console.log('Received data @dnd.js : receiveElement');
    // console.log(productAttributes);

    addProductToList(JSON.parse(productAttributes), 1, 'basket');   // Record to local storage
    return false;
};
