'use strict';
var formElem, callbackDiv, data, ajaxReturnedValue, 

setUp = function(){
    // References to HTML
    formElem = document.getElementById('orderForm');
    callbackDiv = document.getElementById('callbackDiv');

    // Custom event, display ajaxReturnedValue once it's been populated
    document.addEventListener('ajaxReturns', displayResults);

    // Speaker to trigger when form is submitted
    formElem.addEventListener('submit', speaker);

    document.getElementById('deleteForm'). addEventListener('submit', deleteProduct);
    console.log('Loaded');

    // Testing GET & DELETE methods
    listener();
    console.log('After listener: ' + callbackDiv.innerHTML);
    // aDelete();
    // console.log('After aDelete: ' + callbackDiv.innerHTML);
},

listener = function(){
    ajaxGet('api/', callback, ajaxReturnedValue);
},

speaker = function(event){
    event.preventDefault();
    data = new FormData(formElem);
    ajaxPost('api/product', data, callback, ajaxReturnedValue);
},

aDelete = function(){
    ajaxDelete('api/product', callback, ajaxReturnedValue);
},

displayResults = function(){
    var li, ul = document.createElement('ul');
    callbackDiv.appendChild(ul);
    for (var i = 0; i < ajaxReturnedValue.length; i++) {
        li = document.createElement('li');
        li.innerHTML = ajaxReturnedValue[i].prodId + ' ' + ajaxReturnedValue[i].prodName;
        ul.appendChild(li);
    }
    updateDeleteList();
},

updateDeleteList = function(){
    var option, selectToDelete = document.getElementById('valueToDelete');
    selectToDelete.innerHTML = "";
    for (var i = 0; i < ajaxReturnedValue.length; i++) {
        option = document.createElement('option');
        option.innerText = ajaxReturnedValue[i].prodName;
        option.dataset.id = ajaxReturnedValue[i].prodId;
        selectToDelete.appendChild(option);
    };

},

deleteProduct = function(event){
    event.preventDefault();
    var selectToDelete = document.getElementById('valueToDelete'),
        optionToDelete = selectToDelete.options[selectToDelete.selectedIndex],
        idToDelete = optionToDelete.dataset.id;
    ajaxDelete('api/product/' + idToDelete, callback)
    console.log('Deleting ID: ' + idToDelete);
};

window.addEventListener('load', setUp);
