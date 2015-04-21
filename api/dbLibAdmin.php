<?php 
	function orderedProducts($db){
        $query = $db->query('SELECT prodName, COUNT(*) FROM `order` INNER JOIN product ON `order`.prodId = product.prodId GROUP BY prodName');
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
	};

	function incomeProducts($db){
		$query = $db->query('SELECT prodName, SUM(`quantity`) * prodPrice FROM `order` INNER JOIN product ON `order`.prodId = product.prodId GROUP BY prodName');
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
	};
?>
