<?php
	$pageTitle = "Admin";
	$pathToRoot = "..";
	$jsToInclude = ['json', 'ajax', 'admin', 'global'];
	include($pathToRoot . "/lib/preamble.php");
?>

<h1>Product Counts</h1>
<table id="productCounts"></table>

<h1>Product Income</h1>
<table id="productIncome"></table>
<?php
	include($pathToRoot . "/lib/footer.php");
?>