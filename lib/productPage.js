'use strict';

var productListElem, customerListsElem, callbackDiv,

setUp = function(){
    productListElem = document.getElementById('productList');
    customerListsElem = document.getElementById('customerLists');
    callbackDiv = document.getElementById('callbackDiv');

    // Prevents dragover event compromising functionality
    customerListsElem.addEventListener('dragover', neutraliseInterference);

    customerListsElem.addEventListener('drop', receiveElement);


    document.addEventListener('getAllProducts',
        function(){
            console.log('@ getAllProducts : productPage');
            ajaxGet('api/product', callback, 'productList', 'productListChanged', 'json');
    });

    document.addEventListener('getAllLists',
        function(e) {
            console.log('Called getAllLists');
            ajaxGet('api/customerList', callback, 'customerLists', 'customerListsDownloaded', 'json');
    });

    // productList content changed, need to redraw
    document.addEventListener('productListChanged',
        function(){
            var productList = upackStoredJSON('productList');
            // Build product list once data returned
            productListElem.innerHTML = '<h1>Products for sale</h1>';
            // console.log(productList);
            if (!productList){
                alert('The database is not configured.');
                return;
            }

            if (productList === {}){
                console.info('No products to display');
                return;
            }
            for (var i = 0; i < productList.length; i++) {
                createProductElem(productList[i], productListElem);
            }
    });

    // customerLists content changed, need to redraw
    document.addEventListener('customerListsDownloaded',
        function(){
            var customerLists = upackStoredJSON('customerLists');

            console.warn('Redraw customer lists @productPage.php: anon event');
            customerListsElem.innerHTML = '<h1>Your Basket</h1>';
            for(var productIndex in customerLists){
                // foreach list, make section with header
                var list = customerLists[productIndex];
                // console.info(list);

                var product = customerLists[productIndex];

                if (!createProductElem(findProduct(product.prodId), customerListsElem, product.quantity)){
                    ajaxDelete('api/customerList/' + product.prodId , callback, 'ajaxDeleteResponse', 'getAllLists', 'text');
                    console.log('No product of this name, removing from database');
                }            }
    });

    // customerLists content changed, backup to the server
    document.addEventListener('customerListsChangedLocally',
        function(){
            console.warn('Send customerLists to server');
            var data = localStorage['customerLists'],
                form = new FormData();

            form.append('customerLists', data);
            console.log(data);
            console.log(form);

            ajaxPost('api/customerList', form, callback, 'customerLists', 'getAllLists', 'text');
    });

    document.dispatchEvent(new CustomEvent('getAllProducts'));
    document.dispatchEvent(new CustomEvent('getAllLists'));
},

rm= function(){
    ajaxDelete('api/customerList/*', callback, ajaxReturnedValue, 'text');
},

createProductElem = function(productAttributes, container, quantity){
    // Create section containing on screen representation of a product, including JSON of db entry
    console.log('Creating product elem @productPage.js : createProductElem');
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

    title.textContent = productAttributes.prodName + ' (£' + productAttributes.prodPrice + ')' ;
    product.appendChild(title);

    description.textContent = productAttributes.prodDescription;
    product.appendChild(description);

    if (productAttributes.imageName){
        img.src = 'images/' + productAttributes.imageName;
        product.appendChild(img);
    }

    qty.textContent = quantity;
    qty.id = 'quantity';
    product.appendChild(qty);

    var btn = document.createElement('button');
    product.appendChild(btn);

    container.appendChild(product);

    switch(container.id){
        case 'productList':
            // Don't drag products already in basket
            // console.log('dragstart added');
            product.addEventListener('dragstart', pickUpElement);

            qty.textContent = productAttributes.prodStockLevel + ' in stock.'

            btn.textContent = 'Add';
            btn.addEventListener('click',
                 function(){
                    addProductToList(productAttributes, parseInt(prompt('How many to add?')), 'basket');
            });
            break;

        case 'customerLists':
            btn.textContent = 'Delete';
            btn.addEventListener('click',
                function(){
                    var id = productAttributes.prodId;
                    ajaxDelete('api/customerList/' + id , callback, 'ajaxDeleteResponse', 'getAllLists', 'text');
            });

            qty.textContent = quantity + ' in basket.'
            break;
    }
    return true;
},

addProductToList = function (productAttributes, quantity, list) {
    // productAttributes must be an object. NOT JSON
    // Store the order in json in localStorage

    console.log('@ addProductToList : productPage');
    // console.log(productAttributes);
    // console.log(quantity);
    // console.log(list);
    if (quantity === null){
        console.warn('Invalid quantity. Not added to customerLists');
        return;
    }

    var customerLists = upackStoredJSON('customerLists');  // Get customerLists

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
            'prodId'     : productAttributes['prodId'],
            'quantity'   : quantity
        };
        customerLists.push(selectedProduct);
    }

    console.warn(customerLists);

    packJSON('customerLists', customerLists);

    console.log('dispatchEvent:customerListsChangedLocally @addProductToList : productPage');
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