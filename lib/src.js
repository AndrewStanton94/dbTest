'use strict';
var formElem, callbackDiv, data,

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
    aDelete();
    console.log('After aDelete: ' + callbackDiv.innerHTML);
},

callback = function(response){
    callbackDiv.innerHTML = response;
},

listener = function(){
    ajaxGet('api/', callback);
},

speaker = function(event){
    event.preventDefault();
    data = new FormData(formElem);
    ajaxPost('api/product', data, callback);
},

aDelete = function(){
    ajaxDelete('api/asdf/fdsa', callback);
};

window.addEventListener('load', setUp);
