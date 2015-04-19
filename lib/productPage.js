'use strict';

var productListElem, customerListsElem, callbackDiv,

setUp = function(){
    productListElem = document.getElementById('productList');
    customerListsElem = document.getElementById('customerLists');
    callbackDiv = document.getElementById('callbackDiv');

    // Prevents dragover event compromising functionality
    customerListsElem.addEventListener('dragover', neutraliseInterference);

    customerListsElem.addEventListener('drop', receiveElement);

    // productList content changed, need to redraw
    document.addEventListener('productListChanged',
        function(){
            console.group();
            var productList = upackStoredJSON('productList');
            // Build product list once data returned
            productListElem.innerHTML = '<h1>Products for sale</h1>';
            if (productList === {}){
                console.info('No products to display');
                return;
            }
            for (var i = 0; i < productList.length; i++) {
                createProductElem(productList[i], productListElem);
            }
            console.groupEnd();
    });

    // customerLists content changed, need to redraw
    document.addEventListener('customerListsChanged',
        function(){
            console.group();
            var customerLists = upackStoredJSON('customerLists');
            // console.log(customerLists);

            console.log('Rebuilding customer lists @productPage.php: anon event');
            customerListsElem.innerHTML = '<h1>List of stuff</h1>';
            for(var productIndex in customerLists){
                // foreach list, make section with header
                var list = customerLists[productIndex];
                console.info(list);

                var product = customerLists[productIndex];

                createProductElem(findProduct(product.prodId), customerListsElem, product.quantity);
            }
            console.groupEnd();
    });

    // customerLists content changed, backup to the server
    // document.addEventListener('customerListsChanged',
    //     function(){
    //         var data = new FormData();
    //             data.append('customerLists', localStorage['customerLists']);
    //         ajaxPost('api/customerList', data, callback, ajaxReturnedValue, 'text');

    // });

    getAllProducts();
    console.log('dispatchEvent:customerListsChanged @setUp : productPage');
    document.dispatchEvent(new CustomEvent('customerListsChanged'));
},

rm= function(){
    ajaxDelete('api/customerList/*', callback, ajaxReturnedValue, 'text');
},

getAllProducts = function(){
    console.log('@ getAllProducts : productPage');
    ajaxGet('api/product', callback, 'productList', 'json');
},

getAllLists = function(){
    console.group();
    console.log('Called getAllLists');
    ajaxGet('api/customerList', callback, 'customerLists', 'json');
    console.log('Saving lists locally');
    console.groupEnd();
},

createProductElem = function(productAttributes, container, quantity){
    // Create section containing on screen representation of a product, including JSON of db entry
    console.group();
    console.log('Creating product elem @productPage.js : createProductElem');
    var
        product = document.createElement('section'),
        title = document.createElement('h1'),
        qty = document.createElement('p'),
        description = document.createElement('p'),
        img = document.createElement('img');

    console.info(productAttributes);

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

    switch(container.id){
        case 'productList':
            // Don't drag products already in basket
            // console.log('dragstart added');
            product.addEventListener('dragstart', pickUpElement);

            btn.textContent = 'Add';
            btn.addEventListener('click',
                 function(e){
                    addProductToList(productAttributes, prompt('How many to add?'), 'basket');
            });
            break;

        case 'customerLists':
            btn.textContent = 'Delete';
            btn.addEventListener('click',
                 function(e){
                    alert('This is delete function');
            });
            break;
    }
    console.groupEnd();
},

addProductToList = function (productAttributes, quantity, list) {
    // Store the order in json in localStorage

    console.group();
    console.log('@ addProductToList : productPage');

    customerLists = upackStoredJSON('customerLists');  // Get customerLists

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
    console.info(selectedProduct);

    if (selectedProduct) {
        console.log('Existing product');
        selectedProduct.quantity += quantity;                          // Update existing product
    }
    else {
        console.log('New product');
                 // New product with quantity
        selectedProduct = {
            'customerId' : 0,
            'list'       : "basket",
            'prodId'     : productAttributes.prodId,
            'quantity'   : quantity
        }
        customerLists[productAttributes.prodId] = selectedProduct;
    }

    packJSON('customerLists', customerLists);

    console.log('dispatchEvent:customerListsChanged @addProductToList : productPage');
    document.dispatchEvent(new CustomEvent('customerListsChanged'));
    console.groupEnd();
},

findProduct = function (searchID){
    // Use prodId to get product as found in local storage
    var productList = upackStoredJSON('productList');

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].prodId === searchID){
            return productList[i];
        } 
    }
};
