'use strict';
var createForm, modifyForm, callbackDiv, data, ajaxReturnedValue, 

setUp = function(){
    // References to HTML
    createForm = document.getElementById('createForm');
    modifyForm = document.getElementById('modifyForm');
    callbackDiv = document.getElementById('callbackDiv');

    // Custom events, when db changed get latest data
    // display ajaxReturnedValue once it's been populated
    document.addEventListener('ajaxMadeChage', listener);
    document.addEventListener('ajaxReturns', displayResults);
    document.addEventListener('ajaxReturns', updateProductLists);

    // Speaker to trigger when form is submitted
    createForm.addEventListener('submit', speaker);
    modifyForm.addEventListener('submit', aPut);

    document.getElementById('deleteForm').addEventListener('submit', deleteProduct);

    console.log('Loaded');

    // Testing GET & DELETE methods
    listener();
    console.log('After listener: ' + callbackDiv.innerHTML);
    // aDelete();
    // console.log('After aDelete: ' + callbackDiv.innerHTML);
    // aTest();

    document.getElementById('productCreationTitle').addEventListener('click', toggleVisibility);
    document.getElementById('productDeletionTitle').addEventListener('click', toggleVisibility);
    document.getElementById('productModificationTitle').addEventListener('click', toggleVisibility);
    document.getElementById('selectToEdit').addEventListener('submit', loadProductToModify);
},

listener = function(){
    console.log('Called listener');
    ajaxGet('api/', callback, ajaxReturnedValue, 'json');
},

speaker = function(event){
    event.preventDefault();
    data = new FormData(createForm);
    ajaxPost('api/product', data, callback, ajaxReturnedValue, 'json');
},

aDelete = function(){
    ajaxDelete('api/product', callback, ajaxReturnedValue, 'json');
},

displayResults = function(){
    var li,
        ul = document.getElementById('productList');

    if (ul){    // Empty it
        ul.innerHTML = '';
    }
    else{       // Create it
        ul = document.createElement('ul');
        ul.id = 'productList';
    }
    if (ajaxReturnedValue && ajaxReturnedValue.length){
        callbackDiv.appendChild(ul);

        for (var i = 0; i < ajaxReturnedValue.length; i++) {
            li = document.createElement('li');
            li.innerHTML = ajaxReturnedValue[i].prodId + ' ' + ajaxReturnedValue[i].prodName;
            ul.appendChild(li);
        }
    }
    else{
        console.log('No products in ajaxReturnedValue. Nothing returned from database, or XHR not set as json');
    }
},

updateProductLists = function(){
    // Update the options for both the delete and modify select elements
    var option, option1,
        selectToDelete = document.getElementById('valueToDelete'),
        selectToModify = document.getElementById('valueToModify');

        selectToDelete.innerHTML = selectToModify.innerHTML = '';

    if(ajaxReturnedValue && ajaxReturnedValue.length){
        for (var i = 0; i < ajaxReturnedValue.length; i++) {
            option = document.createElement('option');
            option.innerText = ajaxReturnedValue[i].prodName;
            option.dataset.id = ajaxReturnedValue[i].prodId;

            option1 = document.createElement('option');
            option1.innerText = ajaxReturnedValue[i].prodName;
            option1.dataset.id = ajaxReturnedValue[i].prodId;

            selectToDelete.appendChild(option);
            selectToModify.appendChild(option1);
        }
    }
},

deleteProduct = function(event){
    event.preventDefault();
    var selectToDelete = document.getElementById('valueToDelete'),
        optionToDelete = selectToDelete.options[selectToDelete.selectedIndex],
        idToDelete = optionToDelete.dataset.id;
    ajaxDelete('api/product/' + idToDelete, callback);
    console.log('Deleting ID: ' + idToDelete);
},

toggleVisibility = function(event){
    var section = event.target.parentElement,
        forms = section.getElementsByTagName('form');
        for (var i = 0; i < forms.length; i++) {
            console.log(section);
            console.log(forms[i]);
            console.log(forms[i].style.display);
            if (forms[i].style.display === 'none'){
                forms[i].style.display = 'block';
            }
            else{                   // Default to set a value if empty.
                forms[i].style.display = 'none';
            }
            console.log(forms[i].style.display);
        };
},

loadProductToModify = function(event){
    event.preventDefault();
    console.log('Loading selected product');
    var selectToModify = document.getElementById('valueToModify'),
        indexToModify = selectToModify.selectedIndex,
        data = ajaxReturnedValue[indexToModify],
        form = document.getElementById('modifyForm');

        console.log(ajaxReturnedValue);
        console.log(data);
        console.log(indexToModify);

        form[0].value = data.prodId;
        form[1].value = data.prodName;
        form[2].value = data.prodDescription;
        form[3].value = parseFloat(data.prodPrice);
        form[4].value = parseInt(data.prodStockLevel);
        form[5].value = data.prodCategory;
        form[6].value = data.prodManufacturer;
        form[7].value = data.imageName;
},

aPut = function(event){
    event.preventDefault();
    data = new FormData(modifyForm);
    ajaxPost('api/product/modify', data, callback, ajaxReturnedValue, 'text');
};


var aTest = function(){
    ajaxTest('api/product/10169?start=0&count=10', callback, ajaxReturnedValue, 'text');
};

window.addEventListener('load', setUp);
