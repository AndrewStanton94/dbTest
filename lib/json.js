'use strict';

var
upackStoredJSON = function(key){
    console.group();
    // Retreive JSON data from localstorage.
    // If undefined or error return {}
    var ls, parsed;

    console.log('@upackStoredJSON : productPage');

    ls = localStorage.getItem(key);
    console.info(ls);
    if (!ls){
        console.warn('No data in storage. Return {}');
        return {};
    }
    try{
        parsed = JSON.parse(ls);
    }
    catch(e){
        console.info(e);
        console.warn('Invalid data: Return {}');
        return {};
    }
    return parsed;
    console.groupEnd();
},

packJSON = function(key, data){
    var strData = JSON.stringify(data);
    localStorage[key] = strData;
};
