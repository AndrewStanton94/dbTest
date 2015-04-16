'use strict';
var

pickUpElement = function (e){
    // dragstart event
    var prodId = e.target.dataset.id;
    console.log(e);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.dropEffect = 'copy';
    e.dataTransfer.setData('text/plain', prodId);
    return true;
},

neutraliseInterference = function(e) {
    // Prevent conflicts with default behaviour of dragover event 
    e.preventDefault();
    // e.stopPropagation();
},

receiveElement = function(e){
    // drop event
    e.preventDefault();
    e.stopPropagation();
    console.log('Received ');
    console.log(e.target);
    console.log(e.dataTransfer.getData('text/plain'));
    return false;
};
