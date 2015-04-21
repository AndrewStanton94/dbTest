var
setUp = function(){
	var productCountTable = document.getElementById('productCounts'),
		productIncomeTable = document.getElementById('productIncome');

	ajaxGet('../api/admin/count', callback, 'adminDataCount', 'retreivedAdminDataCount', 'json');
	ajaxGet('../api/admin/income', callback, 'adminDataIncome', 'retreivedAdminDataIncome', 'json');

	document.addEventListener('retreivedAdminDataCount',
		function(){
			drawTable('adminDataCount', productCountTable, 'Product Name', 'Product Count', 'prodName', 'COUNT(*)');
	});

	document.addEventListener('retreivedAdminDataIncome',
		function(){
			drawTable('adminDataIncome', productIncomeTable, 'Product Name', 'Product Income', 'prodName', 'SUM(`quantity`) * prodPrice');
	});
},

drawTable = function(dataKey, table, c1Caption, c2Caption, c1Key, c2Key){
		var row, c1, c2,
			data = upackStoredJSON(dataKey);
			console.log(data);

		table.innerHTML = '<tr><th>' + c1Caption + '</th><th>' + c2Caption + '</th></tr>';
		for (var i = 0; i < data.length; i++) {
			row = document.createElement('tr');
			c1 = document.createElement('td'); 
			c2 = document.createElement('td'); 

			c1.textContent = data[i][c1Key];
			c2.textContent = data[i][c2Key];
			table.appendChild(row);
			row.appendChild(c1);
			row.appendChild(c2);
				
		}
	}
