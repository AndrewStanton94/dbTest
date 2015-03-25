'use strict';
var formElem, data,

setUp = function() {
    formElem = document.getElementById('orderForm');
    formElem.addEventListener('submit', speaker);
    console.log('Loaded');
},

callback = function (response) {
    document.getElementById('callbackDiv').innerHTML = response; //'Working now?';
},

speaker = function(event) {
    event.preventDefault();
    data = new FormData(formElem);
    console.log(data.toString());
    ajaxPost('api/', data, callback);
};

window.addEventListener('load', setUp);