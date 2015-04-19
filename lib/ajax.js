'use strict';

var  
ajaxGet = function(URL, callback, localStorageKey, eventToCall, responseType){
    // URL             : Location of resource
    // callback        : Function to be executed on success
    // localStorageKey : Put returned data here in localStorage
    // eventToCall     : eventHandler to be dispatched
    // responseType    : expected type of returned data <text | json>

    var xhr = new XMLHttpRequest();
    function success (){
        // console.log('ajaxGet succeeded');
        callback(xhr.response, xhr, localStorageKey);
        console.log('Display latest data. dispatchEvent(' + eventToCall +')');
        document.dispatchEvent(new CustomEvent(eventToCall));     // Ajax got new data, so draw it
    }

    function fail(){
        console.log('ajaxGet failed');
        callback('failed', xhr);
    }

    xhr.open('GET', URL);
    if (responseType === 'json'){
        xhr.responseType = 'json';
    }
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(null);
},

ajaxPost = function(URL, data, callback, localStorageKey, eventToCall, responseType){
    // URL             : Location of resource
    // data            : data to be transmitted
    // callback        : Function to be executed on success
    // localStorageKey : Put returned data here in localStorage
    // eventToCall     : eventHandler to be dispatched
    // responseType    : expected type of returned data <text | json>
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxPost succeeded');
        callback(xhr.response, xhr, localStorageKey);     // Use of this keyword
        console.log('Get latest data');
        document.dispatchEvent(new CustomEvent(eventToCall));     // ajax* has changed stuff serverside, need to get the data
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

ajaxDelete = function(URL, callback, localStorageKey, eventToCall, responseType){
    // URL             : Location of resource
    // callback        : Function to be executed on success
    // localStorageKey : Put returned data here in localStorage
    // eventToCall     : eventHandler to be dispatched
    // responseType    : expected type of returned data <text | json>
    console.log('In ajaxDelete');
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxDelete succeeded');
        callback(xhr.response, xhr, localStorageKey);
        document.dispatchEvent(new CustomEvent(eventToCall));     // ajax* has changed stuff serverside, need to get the data
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
    // Expects text data to be dumped into callbackDiv for testing
    // or JSON data for use in application
    // Regardless data will be put into localStorage
    console.group();
    console.info(xhr.responseType + ' callback. Status ' + xhr.status + 'Data: ');
    console.info(response);
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
    console.groupEnd();
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
//uggcf://tvguho.pbz/ZTbivre/JroFpeC/gerr/znfgre/qbpf/cqs
