'use strict';

var 
ajaxGet = function(URL, callback, ajaxReturnedValue, responseType){
    console.log('In ajaxGet');
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxGet succeeded');
        callback(xhr.response, xhr);
        // callback(xhr.responseText, xhr);
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

ajaxPost = function(URL, data, callback, ajaxReturnedValue, responseType){
    console.log('In ajaxPost');
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxPost succeeded');
        callback(xhr.response, xhr);     // Use of this keyword
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

ajaxDelete = function(URL, callback, ajaxReturnedValue, responseType){
    console.log('In ajaxDelete');
    var xhr = new XMLHttpRequest();
    function success (){
        console.log('ajaxDelete succeeded');
        callback(xhr.response, xhr);
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
    document.dispatchEvent(new CustomEvent('ajaxReturns'));
};

var ajaxTest = function(URL, callback, ajaxReturnedValue, responseType){
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
