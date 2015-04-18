'use strict';

var customerListsFromServer = 'lolwut';
var productListElem, customerListsElem, customerLists, callbackDiv,

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

    document.addEventListener('ajaxReturns',
        function(){
            // Build product list once data returned
            productListElem.innerHTML = '<h1>Products for sale</h1>';
            if (!ajaxReturnedValue){
                console.log('No products to display');
                return;
            };
            for (var i = 0; i < ajaxReturnedValue.length; i++) {
                createProductElem(ajaxReturnedValue[i], productListElem);
            }
    });

    // customerLists content changed, need to redraw
    document.addEventListener('customerListsChanged',
        function(){
            var listSection, listSectionTitle;

            var ls = localStorage.getItem('customerLists');
            console.log('customerLists: ');
            console.log(ls);
            if (!ls){
                console.log('No data in customerLists. Nothing to draw');
            }
                return;
            customerLists = JSON.parse(ls);
            console.log('Rebuilding customer lists @productPage.php: anon event');
            customerListsElem.innerHTML = '<h1>List of stuff</h1>';
            console.log(customerLists);
            for(var listIndex in customerLists){
                // foreach list, make section with header
                var list = customerLists[listIndex];
                console.log(list);

                listSection = document.createElement('section');
                listSection.id = listIndex;
                customerListsElem.appendChild(listSection);
                listSectionTitle = document.createElement('h1');
                listSectionTitle.innerHTML = listIndex;
                listSection.appendChild(listSectionTitle);
                listSection.addEventListener('drop', receiveElement);

                for(var productIndex in list){     // Populate section
                    var product = list[productIndex];
                    console.log(list[productIndex]);
                    createProductElem(product.product, listSection, product.quantity);
                }
            }
    });

    // customerLists content changed, backup to the server
    document.addEventListener('customerListsChanged',
        function(){
            var data = new FormData();
                data.append('customerLists', localStorage['customerLists']);
            ajaxPost('api/customerList', data, callback, ajaxReturnedValue, 'text');

    });

    getAllProducts();
    document.dispatchEvent(new CustomEvent('customerListsChanged'));
},

rm= function(){
    ajaxDelete('api/customerList/*', callback, ajaxReturnedValue, 'text');
},

getAllProducts = function(){
    console.log('Called getAllProducts');
    ajaxGet('api/product', callback, ajaxReturnedValue, 'json');
},

getAllLists = function(){
    // var customerListsFromServer;
    console.log('Called getAllLists');
    ajaxGet('api/customerList', callback, customerListsFromServer, 'text');
    console.log('Saving lists locally');
    localStorage['customerLists'] = customerListsFromServer;
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
    // console.log(productAttributes);

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

    container.appendChild(product);

    if (container.id === 'productList'){
        console.log('dragstart added');
        product.addEventListener('dragstart', pickUpElement);
    }
},

addProductToList = function (productAttributes, quantity, list) {
    // Store the order in json in localStorage
    // {listName:
    //     {
    //         prodId:
    //         {
    //             product:
    //             qty:
    //         }
    //     }
    // }

    var targetList, targetProduct,
        customerLists = localStorage.getItem('customerLists');

    customerLists = customerLists ? JSON.parse(customerLists) : {};     // all lists from customer
    targetList = customerLists[list] ? customerLists[list] : {};          // get chosen list

    productAttributes = JSON.parse(productAttributes);
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
};
