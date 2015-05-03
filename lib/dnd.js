'use strict';
var list, productAttributes,

pickUpElement = function (e){
    // dragstart event
    productAttributes = e.target.dataset.attributes;
    console.log('@dnd.js : pickUpElement');
    // console.log(e);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.dropEffect = 'copy';
    // e.dataTransfer.setData('text', e.target.dataset.attributes);
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
    // var productAttributes = e.dataTransfer.getData('text');
        // list = e.target;
        // console.log(list);

    console.log('Received data @dnd.js : receiveElement');
    // console.log(productAttributes);



    addProductToList(JSON.parse(productAttributes), 1, 'basket');   // Record to local storage
                        // TODO :s/basket/list
    return false;
};
