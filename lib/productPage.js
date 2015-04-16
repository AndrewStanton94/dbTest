'use strict';
var productListElem,

setUp = function(){
    productListElem = document.getElementById('productList');
    console.log(productListElem);

    document.getElementById('customerLists').addEventListener('dragover', neutraliseInterference);

    document.getElementById('customerLists').addEventListener('drop', receiveElement);
    // document.getElementById('customerLists').addEventListener('dragEnd', receiveElement);

    document.addEventListener('ajaxReturns',
        function(){
            // Build product list once data returned
            productListElem.innerHTML = '';
            for (var i = 0; i < ajaxReturnedValue.length; i++) {
                createProductElem(ajaxReturnedValue[i]);
            }
    });

    getAllProducts();

},

getAllProducts = function(){
    console.log('Called getAllProducts');
    ajaxGet('api/product', callback, ajaxReturnedValue, 'json');
},

createProductElem = function(productAttributes){
    var
        product = document.createElement('section'),
        title = document.createElement('h1'),
        description = document.createElement('p'),
        img = document.createElement('img');

        product.draggable = 'true';
        product.className = 'product';

        title.innerText = productAttributes.prodName;
        product.appendChild(title);

        description.innerText = productAttributes.prodDescription;
        product.appendChild(description);

        if (productAttributes.imageName){
            img.src = 'images/' + productAttributes.imageName;
            product.appendChild(img);
        }

        productListElem.appendChild(product);
        product.addEventListener('dragstart', pickUpElement);

};
