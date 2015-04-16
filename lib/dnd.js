'use strict';
var

pickUpElement = function (e){
    // dragstart event
    var data = e.target.dataset.attributes;
    console.log(e);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.dropEffect = 'copy';
    e.dataTransfer.setData('application/json', data);
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
    console.log('Received ');
    // console.log(e.target);
    console.log(e.dataTransfer.getData('application/json'));
    return false;
};
