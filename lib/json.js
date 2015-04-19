'use strict';

var
upackStoredJSON = function(key){
    // Retreive JSON data from localstorage.
    // If undefined or error return {}
    var ls, parsed;

    // console.log('@upackStoredJSON : productPage');

    ls = localStorage.getItem(key);
    // console.info(ls);
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
},

packJSON = function(key, data){
    var strData = JSON.stringify(data);
        strData = strData.replace(/null,/g, '');
    localStorage[key] = strData;
};
