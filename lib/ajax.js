'use strict';

function ajaxGet(URL, callback){

    var xhr = new XMLHttpRequest();
    function success (){
        callback(xhr.responsetext);
    }

    function fail(){
        callback('failed');
    }

    xhr.open('GET', URL); // The TRUE implies asynchronous
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(null);
};

function ajaxPost(URL, data, callback){

    var xhr = new XMLHttpRequest();
    function success (){
        callback(xhr.responseText);     // Use of this keyword
    }

    function fail(){
        callback('failed');
    }

    xhr.open('POST', URL);
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(data);
}