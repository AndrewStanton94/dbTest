'use strict';

var 
ajaxGet = function(URL, callback){

    var xhr = new XMLHttpRequest();
    function success (){
        callback(xhr.response, xhr);
        // callback(xhr.responseText, xhr);
    }

    function fail(){
        callback('failed', xhr);
    }

    xhr.open('GET', URL); // The TRUE implies asynchronous
    xhr.responseType = 'json';
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(null);
},

ajaxPost = function(URL, data, callback){

    var xhr = new XMLHttpRequest();
    function success (){
        callback(xhr.response, xhr);     // Use of this keyword
    }

    function fail(){
        callback('failed', xhr);
    }

    xhr.open('POST', URL);
    xhr.responseType = 'json';
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(data);
},

ajaxDelete = function(URL, callback){

    var xhr = new XMLHttpRequest();
    function success (){
        callback(xhr.response, xhr);
    }

    function fail(){
        callback('failed',xhr);
    }

    xhr.open('DELETE', URL);
    xhr.responseType = 'json';
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(null);
},

callback = function(response, xhr){
    // Modify: text returned to given container, paramatarise callbackDiv
    //          json returned to variable, same attr as callbackDiv?
    // Too much coupling?
    // CAllback class? Construct in param??
    console.log(xhr.responseType + ' callback. Status ' + xhr.status + 'Data: ');
    switch(xhr.responseType){
        case '':
            var backgroundColor;
            callbackDiv.innerHTML = callbackDiv.innerHTML + '<br>' + response; //+ ' code:' + xhr.status + ' responseType' + xhr.responseType;
            switch(xhr.status){
                case 200:
                    backgroundColor = '#0F0';
                    break;

                default:
                    backgroundColor = '#F00';
                    break;
            }
            callbackDiv.style.backgroundColor = backgroundColor;
            break;

        case 'json':
            console.log(response);
            ajaxReturnedValue = xhr.response;
            break;
    }
    console.log('Rebuild product lists');
    document.dispatchEvent(new CustomEvent('ajaxReturns'));
};

var ajaxTest = function(URL, callback){

    var xhr = new XMLHttpRequest();
    function success (){
        callback(xhr.response, xhr);
        // callback(xhr.responseText, xhr);
    }

    function fail(){
        callback('failed', xhr);
    }

    xhr.open('PUT', URL); // The TRUE implies asynchronous
    xhr.addEventListener('load', success);
    xhr.addEventListener('error', fail);
    xhr.send(null);

};
