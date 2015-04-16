'use strict';
var callbackDiv, data, 

// displayResults = function(){
//     var li,
//         ul = document.getElementById('productList');

//     if (ul){    // Empty it
//         ul.innerHTML = '';
//     }
//     else{       // Create it
//         ul = document.createElement('ul');
//         ul.id = 'productList';
//     }
//     if (ajaxReturnedValue && ajaxReturnedValue.length){
//         callbackDiv.appendChild(ul);

//         for (var i = 0; i < ajaxReturnedValue.length; i++) {
//             li = document.createElement('li');
//             li.innerHTML = ajaxReturnedValue[i].prodId + ' ' + ajaxReturnedValue[i].prodName;
//             ul.appendChild(li);
//         }
//     }
//     else{
//         console.log('No products in ajaxReturnedValue. Nothing returned from database, or XHR not set as json');
//     }
// },

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
};


// var aTest = function(){
//     ajaxTest('api/product/10169?start=0&count=10', callback, ajaxReturnedValue, 'text');
// };

window.addEventListener('load', setUp);
