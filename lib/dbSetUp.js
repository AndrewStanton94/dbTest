'use strict';

var

setUp = function (){
	var form = document.getElementById('config');

	form.addEventListener('submit',
		function(event) {
			event.preventDefault();
			var strOut = '<?php const DBSERVER = "';
			strOut += (form[0].value + '";\n');

			strOut += 'const DBNAME = "';
			strOut += (form[1].value + '";\n');

			strOut += 'const DBUSER = "';
			strOut += (form[2].value + '";\n');

			strOut += 'const DBPW = "';
			strOut += (form[3].value + '";\n');

			strOut += 'const DBINIT = "';
			strOut += (form[4].value + '";\n?>');

	document.getElementById('output').textContent = strOut;
	localStorage['config'] = 'true';
	});
}