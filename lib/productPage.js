'use strict';
var productListElem, customerListsElem,
        dData = {prodId: 1, prodName: 'bob'},

setUp = function(){
    productListElem = document.getElementById('productList');
    customerListsElem = document.getElementById('customerLists');
    // console.log(productListElem);

    customerListsElem.addEventListener('dragover', neutraliseInterference);

    customerListsElem.addEventListener('drop', receiveElement);
    // document.getElementById('customerLists').addEventListener('dragEnd', receiveElement);

    document.addEventListener('ajaxReturns',
        function(){
            // Build product list once data returned
            productListElem.innerHTML = '';
            for (var i = 0; i < ajaxReturnedValue.length; i++) {
                createProductElem(ajaxReturnedValue[i], productListElem);
            }
    });

    document.addEventListener('customerListsChanged',
        function(){
            var listSection, listSectionTitle,
                customerLists = JSON.parse(localStorage.getItem('customerLists'));
            console.log('Rebuilding customer lists');
            customerListsElem.innerHTML = '<h1>List of stuff</h1>';
            for(var list in customerLists){
                // foreach list, make section with header
                listSection = document.createElement('section');
                customerListsElem.appendChild(listSection);
                listSectionTitle = document.createElement('h1');
                listSection.appendChild(listSectionTitle);

                for(var product in customerLists.list){     // Populate section
                    createProductElem(product, listSection);
                }
            }
    });

    getAllProducts();

},

getAllProducts = function(){
    console.log('Called getAllProducts');
    ajaxGet('api/product', callback, ajaxReturnedValue, 'json');
},

createProductElem = function(productAttributes, container){
    var
        product = document.createElement('section'),
        title = document.createElement('h1'),
        description = document.createElement('p'),
        img = document.createElement('img');

        product.draggable = 'true';
        product.className = 'product';
        product.dataset.attributes = JSON.stringify(productAttributes);

        title.innerText = productAttributes.prodName;
        product.appendChild(title);

        description.innerText = productAttributes.prodDescription;
        product.appendChild(description);

        if (productAttributes.imageName){
            img.src = 'images/' + productAttributes.imageName;
            product.appendChild(img);
        }

        container.appendChild(product);
        product.addEventListener('dragstart', pickUpElement);
},

addProductToList = function (productAttributes, quantity, list) {
    // {listName:
    //     {
    //         prodId:
    //         {
    //             product:
    //             qty:
    //         }
    //     }
    // }

    var targetList,
        customerLists = localStorage.getItem('customerLists');

    customerLists = customerLists ? JSON.parse(customerLists) : {};     // all lists from customer

    targetList = customerLists[list] ? customerLists[list] : {};          // get chosen list

    var targetProduct = targetList[productAttributes.prodId];           // Chosen product / null
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

    console.log(customerLists);
};
