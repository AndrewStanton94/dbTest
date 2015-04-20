'use strict';

var customerListsElem, callbackDiv, address, buyButton, addressForm,

setUp = function(){
    customerListsElem = document.getElementById('basket');
    callbackDiv = document.getElementById('callbackDiv');
    address = document.getElementById('address');
    buyButton = document.getElementById('buy');
    addressForm = document.getElementById('addressForm');

    // Prevents dragover event compromising functionality
    customerListsElem.addEventListener('dragover', neutraliseInterference);

    customerListsElem.addEventListener('drop', receiveElement);


    document.addEventListener('getAllProducts',
        function(){
            console.log('@getAllProducts : checkout');
            ajaxGet('api/product', callback, 'productList', 'productListChanged', 'json');
    });

    document.addEventListener('getAllLists',
        function(e) {
            console.log('Called getAllLists');
            ajaxGet('api/customerList', callback, 'customerLists', 'customerListsDownloaded', 'json');
    });

    // customerLists content changed, need to redraw
    document.addEventListener('customerListsDownloaded',
        function(){
            var customerLists = upackStoredJSON('customerLists');

            customerListsElem.innerHTML = '<h1>Your Basket</h1>';
            for(var productIndex in customerLists){
                // foreach list, make section with header
                var list = customerLists[productIndex];
                // console.info(list);

                var product = customerLists[productIndex];

                if (!createProductElem(findProduct(product.prodId), customerListsElem, product.quantity)){
                    ajaxDelete('api/customerList/' + product.prodId , callback, 'ajaxDeleteResponse', 'getAllLists', 'text');
                    console.log('No product of this id, removing from database');
                }
            }
    });

    // customerLists content changed, backup to the server
    document.addEventListener('customerListsChangedLocally',
        function(){
            console.log('Send customerLists to server');
            var data = localStorage['customerLists'],
                form = new FormData();

            form.append('customerLists', data);
            console.log(data);
            console.log(form);

            ajaxPost('api/customerList', form, callback, 'customerLists', 'getAllLists', 'text');
    });

    buyButton.addEventListener('click', function(e) {
        console.log(e.target.textContent);

        if (e.target.textContent === 'Go to Details'){
            e.target.textContent = 'Buy';
            customerListsElem.style.display = 'none';
            address.style.display = 'block';
        }
        else{
            window.location.assign('redirect.php')
        }
    });

    document.dispatchEvent(new CustomEvent('getAllProducts'));
    document.dispatchEvent(new CustomEvent('getAllLists'));
},

rm= function(){
    ajaxDelete('api/customerList/*', callback, ajaxReturnedValue, 'text');
},

createProductElem = function(productAttributes, container, quantity){
    // Create section containing on screen representation of a product, including JSON of db entry
    console.log('Creating product elem @checkout.js : createProductElem');
    if (productAttributes === undefined){
        console.warn('Invalid data passed to createProductElem');
        return false;
    }

    var
        product = document.createElement('section'),
        title = document.createElement('h1'),
        qty = document.createElement('p'),
        description = document.createElement('p'),
        img = document.createElement('img');

    // console.info(productAttributes);

    product.draggable = 'true';
    product.className = 'product';
    product.dataset.attributes = JSON.stringify(productAttributes);

    title.textContent = productAttributes.prodName;
    product.appendChild(title);

    qty.textContent = quantity;
    qty.id = 'quantity';
    product.appendChild(qty);

    description.textContent = productAttributes.prodDescription;
    product.appendChild(description);

    if (productAttributes.imageName){
        img.src = 'images/' + productAttributes.imageName;
        product.appendChild(img);
    }
    var btn = document.createElement('button');
    product.appendChild(btn);

    container.appendChild(product);

    btn.textContent = 'Delete';
    btn.addEventListener('click',
        function(){
            var id = productAttributes.prodId;
            // console.log(d);
            // alert('This i s delete function');

            ajaxDelete('api/customerList/' + id , callback, 'ajaxDeleteResponse', 'getAllLists', 'text');
    });
    return true;
},

addProductToList = function (productAttributes, quantity, list) {
    // Store the order in json in localStorage

    console.log('@addProductToList : checkout');
    // console.log(productAttributes);
    // console.log(quantity);
    // console.log(list);
    if (quantity === null){
        console.warn('Invalid quantity. Not added to customerLists');
        return;
    }

    var customerLists = upackStoredJSON('customerLists');  // Get customerLists

    console.log('customerLists values');
    console.info(customerLists);

    var selectedProduct;
    for (var i = 0; i < customerLists.length; i++) {
        var listItem = customerLists[i];
        if(listItem.list === list && listItem.prodId === productAttributes.prodId){     // Find the product, in given list
            selectedProduct = listItem;
            break;
        }
    }
    // console.info(selectedProduct);

    if (selectedProduct) {
        console.log('Existing product');
        selectedProduct.quantity += quantity;                          // Update existing product
    }
    else {
        console.log('New product');
                 // New product with quantity
        selectedProduct = {
            'customerId' : 0,
            'list'       : 'basket',
            'prodId'     : productAttributes.prodId,
            'quantity'   : quantity
        };
        customerLists[productAttributes.prodId] = selectedProduct;
    }

    packJSON('customerLists', customerLists);

    console.log('dispatchEvent:customerListsChangedLocally @addProductToList : checkout');
    document.dispatchEvent(new CustomEvent('customerListsChangedLocally'));
},

findProduct = function (searchID){
    // Use prodId to get product as found in local storage
    var productList = upackStoredJSON('productList');

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].prodId === searchID){
            return productList[i];
        } 
    }
    return undefined;
};
