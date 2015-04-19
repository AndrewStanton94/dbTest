'use strict';

var customerListsFromServer = 'lolwut';
var productListElem, customerListsElem, callbackDiv,

setUp = function(){
    productListElem = document.getElementById('productList');
    customerListsElem = document.getElementById('customerLists');
    callbackDiv = document.getElementById('callbackDiv');
    // console.log(productListElem);

    // Prevents dragover event compromising functionality
    customerListsElem.addEventListener('dragover', neutraliseInterference);

    // This needs to be sorted, currently whole section, need granularity for lists
    customerListsElem.addEventListener('drop', receiveElement);
    // document.getElementById('customerLists').addEventListener('dragEnd', receiveElement);

    document.addEventListener('productListChanged',
        function(){
            var productList = upackStoredJSON('productList');
            // Build product list once data returned
            productListElem.innerHTML = '<h1>Products for sale</h1>';
            if (productList === {}){
                console.log('No products to display');
                return;
            }
            for (var i = 0; i < productList.length; i++) {
                createProductElem(productList[i], productListElem);
            }
    });

    // customerLists content changed, need to redraw
    document.addEventListener('customerListsChanged',
        function(){
            var customerLists = upackStoredJSON('customerLists');
            // console.log(customerLists);

            console.log('Rebuilding customer lists @productPage.php: anon event');
            customerListsElem.innerHTML = '<h1>List of stuff</h1>';
            for(var productIndex in customerLists){
                // foreach list, make section with header
                var list = customerLists[productIndex];
                console.log(list);

                var product = customerLists[productIndex];

                createProductElem(findProduct(product.prodId), customerListsElem, product.quantity);
            }
    });

    // customerLists content changed, backup to the server
    // document.addEventListener('customerListsChanged',
    //     function(){
    //         var data = new FormData();
    //             data.append('customerLists', localStorage['customerLists']);
    //         ajaxPost('api/customerList', data, callback, ajaxReturnedValue, 'text');

    // });

    getAllProducts();
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
    console.log('Called getAllLists');
    ajaxGet('api/customerList', callback, 'customerLists', 'json');
    console.log('Saving lists locally');
},

createProductElem = function(productAttributes, container, quantity){
    // Create section containing on screen representation of a product, including JSON of db entry
    var
        product = document.createElement('section'),
        title = document.createElement('h1'),
        qty = document.createElement('p'),
        description = document.createElement('p'),
        img = document.createElement('img');

    console.log('Creating product elem @productPage.js : createProductElem');
    console.log(productAttributes);

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
                    prompt('How many to add?');
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
},

addProductToList = function (productAttributes, quantity, list) {
    // Store the order in json in localStorage
    // {listName: {prodId: {product: qty: } } }

    var targetList, targetProduct, customerLists;

    console.log('@productPage addProductToList');
    console.log('customerLists values');
    customerLists = upackStoredJSON('customerLists');       // Get list of lists

    targetList = customerLists[list] ? customerLists[list] : {};          // get chosen list

    productAttributes = JSON.parse(productAttributes);
    console.log(productAttributes);
    console.log('productAttributes to be written to localStorage @productPage.js : addProductToList');
    // console.log(productAttributes);
    targetProduct = targetList[productAttributes.prodId];           // Chosen product / null

    if (targetProduct) {
        console.log('Existing product');
        targetProduct.quantity += quantity;                          // Update existing product
    }
    else {
        console.log('New product');
        targetProduct = {'product': productAttributes,                  // New product with quantity
                            'quantity': quantity
                        }
        targetList[productAttributes.prodId] = targetProduct;           // Add new product to chosen list
    }
    customerLists[list] = targetList;                               // Add modified list to list of lists

    localStorage.setItem('customerLists', JSON.stringify(customerLists));   // Store

    console.log(targetProduct.quantity + ' of ' + targetProduct.product.prodName + ' ordered');
    console.log(targetProduct);

    document.dispatchEvent(new CustomEvent('customerListsChanged'));
},

findProduct = function (searchID){
    var productList = upackStoredJSON('productList');

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].prodId === searchID){
            return productList[i];
        } 
    }
};
