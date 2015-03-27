'use strict';
var formElem, callbackDiv, data,

setUp = function() {
    formElem = document.getElementById('orderForm');
    callbackDiv = document.getElementById('callbackDiv');
    formElem.addEventListener('submit', speaker);
    console.log('Loaded');
    listener();
    console.log("After listener: " + callbackDiv.innerHTML);
    aDelete();
    console.log("After aDelete: " + callbackDiv.innerHTML);
},

callback = function (response) {
	callbackDiv.innerHTML = response;
},

listener = function () {
	ajaxGet('api/', callback);
},

speaker = function(event) {
    event.preventDefault();
    data = new FormData(formElem);
    console.log(data.toString());
    ajaxPost('api/', data, callback);
},

aDelete = function() {
	ajaxDelete('api/', callback);
};

window.addEventListener('load', setUp);