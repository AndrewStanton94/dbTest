'use strict';

var
upackStoredJSON = function(key){
    // Retreive JSON data from localstorage.
    // If undefined or error return {}
    var ls, parsed;

    console.log('@upackStoredJSON : productPage');

    ls = localStorage.getItem(key);
    console.log(ls);
    if (!ls){
        console.log('No data in storage. Return {}');
        return {};
    }
    try{
        parsed = JSON.parse(ls);
    }
    catch(e){
        console.log(e);
        console.log('Invalid data: Return {}');
        return {};
    }
    return parsed;
},

packJSON = function(key, data){
    var strData = JSON.stringify(data);
    localStorage[key] = strData;
};
