'use strict';
var

setUp = function(){
    // Custom events:
        // when db content changed get latest data
    document.addEventListener('ajaxMadeChage', getAllProducts);

    // Update options for product selection elements (deletion and modification)
        // after new data retrieved from server
    document.addEventListener('ajaxReturns',
        function(){
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
        });

    // Add new product to the database
    document.getElementById('createForm').addEventListener('submit',
    	function(event){
		    event.preventDefault();
		    data = new FormData(createForm);
		    ajaxPost('../api/product', data, callback, ajaxReturnedValue, 'json');
	});

    // Remove existing product from the database
    document.getElementById('deleteForm').addEventListener('submit',
    	function(event){
    		event.preventDefault();
    		var selectToDelete = document.getElementById('valueToDelete'),
        		optionToDelete = selectToDelete.options[selectToDelete.selectedIndex],
        	idToDelete = optionToDelete.dataset.id;
    		ajaxDelete('../api/product/' + idToDelete, callback);
    	console.log('Deleting ID: ' + idToDelete);
	});

    // Prepare selected product for editing
    document.getElementById('selectToEdit').addEventListener('submit', 
        function(event){
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
    });
    
    // Replace edited product on database
    document.getElementById('modifyForm').addEventListener('submit',
    	function(event){
		    event.preventDefault();
		    data = new FormData(modifyForm);
		    ajaxPost('../api/product/modify', data, callback, ajaxReturnedValue, 'text');
	});

    // Click on headings of creation, deletion and modification to hide or show.
    document.getElementById('productCreationTitle').addEventListener('click', toggleVisibility);
    document.getElementById('productDeletionTitle').addEventListener('click', toggleVisibility);
    document.getElementById('productModificationTitle').addEventListener('click', toggleVisibility);

    getAllProducts();
},

getAllProducts = function(){
    console.log('Called getAllProducts');
    ajaxGet('../api/product', callback, ajaxReturnedValue, 'json');
};
