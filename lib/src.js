'use strict';
var formElem, callbackDiv, data, ajaxReturnedValue, 

setUp = function(){
    // References to HTML
    formElem = document.getElementById('orderForm');
    callbackDiv = document.getElementById('callbackDiv');

    // Speaker to trigger when form is submitted
    formElem.addEventListener('submit', speaker);
    console.log('Loaded');

    // Testing GET & DELETE methods
    listener();
    console.log('After listener: ' + callbackDiv.innerHTML);
    // aDelete();
    // console.log('After aDelete: ' + callbackDiv.innerHTML);
},

listener = function(){
    ajaxGet('api/', callback, ajaxReturnedValue);
},

speaker = function(event){
    event.preventDefault();
    data = new FormData(formElem);
    ajaxPost('api/product', data, callback, ajaxReturnedValue);
},

aDelete = function(){
    ajaxDelete('api/product', callback, ajaxReturnedValue);
};

window.addEventListener('load', setUp);
