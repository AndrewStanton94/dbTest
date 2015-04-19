'use strict';

var  
ajaxGet = function(URL, callback, localStorageKey, responseType){
    console.log('In ajaxGet');
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxGet succeeded');
        callback(xhr.response, xhr, localStorageKey);
        document.dispatchEvent(new CustomEvent('productListChanged'));     // Ajax got new data, so draw it
        console.log('Display latest data. dispatchEvent("productListChanged")');
    }

    function fail(){
        console.log('ajaxGet failed');
        callback('failed', xhr);
    }

    xhr.open('GET', URL); // The TRUE implies asynchronous
    if (responseType === 'json'){
        xhr.responseType = 'json';
    }
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(null);
},

ajaxPost = function(URL, data, callback, localStorageKey, responseType){
    console.log('In ajaxPost');
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxPost succeeded');
        callback(xhr.response, xhr, localStorageKey);     // Use of this keyword
        document.dispatchEvent(new CustomEvent('ajaxMadeChage'));     // ajax* has changed stuff serverside, need to get the data
        console.log('Get latest data');
    }

    function fail(){
        console.log('ajaxPost failed');
        callback('failed', xhr);
    }

    xhr.open('POST', URL);
    if (responseType === 'json'){
        xhr.responseType = 'json';
    }
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(data);
},

ajaxPut = function(URL, data, callback, localStorageKey, responseType){
    console.log('In ajaxPut');
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxPut succeeded');
        callback(xhr.response, xhr, localStorageKey);     // Use of this keyword
        document.dispatchEvent(new CustomEvent('ajaxMadeChage'));     // ajax* has changed stuff serverside, need to get the data
        console.log('Get latest data');
    }

    function fail(){
        console.log('ajaxPut failed');
        callback('failed', xhr);
    }

    xhr.open('PUT', URL);
    if (responseType === 'json'){
        xhr.responseType = 'json';
    }
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(data);
},

ajaxDelete = function(URL, callback, localStorageKey, responseType){
    console.log('In ajaxDelete');
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxDelete succeeded');
        callback(xhr.response, xhr, localStorageKey);
        document.dispatchEvent(new CustomEvent('ajaxMadeChage'));     // ajax* has changed stuff serverside, need to get the data
        console.log('Get latest data');
    }

    function fail(){
        console.log('ajaxDelete failed');
        callback('failed',xhr);
    }

    xhr.open('DELETE', URL);
    if (responseType === 'json'){
        xhr.responseType = 'json';
    }
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(null);
},

callback = function(response, xhr, localStorageKey){
    console.log(xhr.responseType + ' callback. Status ' + xhr.status + 'Data: ');
    console.log(response);
    packJSON(localStorageKey, xhr.response);
    switch(xhr.responseType){
        case '':
            var backgroundColor;
            if (callbackDiv){
                callbackDiv.innerHTML += response;
            };
            // callbackDiv.innerHTML = callbackDiv.innerHTML + '<br>' + response;
            switch(xhr.status){
                case 200:
                    backgroundColor = '#0F0';
                    break;

                default:
                    backgroundColor = '#F00';
                    break;
            }
            if (callbackDiv){
                callbackDiv.style.backgroundColor = backgroundColor;
            }
            break;

        case 'json':
            // Currently needs no extra handling
            break;
    }
};

var ajaxTest = function(URL, callback, localStorageKey, responseType){
    console.log('In ajaxTest');
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxTest succeeded');
        callback(xhr.response, xhr);
        // callback(xhr.responseText, xhr);
    }

    function fail(){
        console.log('ajaxTest failed');
        callback('failed', xhr);
    }

    xhr.open('PUT', URL); // The TRUE implies asynchronous
    if (responseType === 'json'){
        xhr.responseType = 'json';
    }
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(null);

};
