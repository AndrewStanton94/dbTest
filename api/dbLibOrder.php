<?php 
	function placeOrder($db){
		// echo $_POST["name"];
		$order = json_decode($_POST["order"], true);
		$returnData = [];
		$db -> beginTransaction();
		foreach ($order as $key => $orderedItem) {

			$p = getProductById($db, $orderedItem["prodId"]);

			if ($orderedItem["quantity"] <= $p['prodStockLevel']){
				// echo "Can supply " . $p['prodName'];
				addProductToOrder($db, $orderedItem);
			}
			else {
				// echo "Can't supply " . $p['prodName'];
				$feedback = [];
				$feedback[] = false;
				$feedback[] = $orderedItem;
				$feedback[] = $p;
				$returnData[] = $feedback;
				$db -> rollBack();
			}

			// print_r($p);
			// echo gettype($orderedItem["quantity"]);
			// echo gettype($p['prodStockLevel']);
			// if ($orderedItem["quantity"] <= $p['prodStockLevel']){
			// 	echo "Can supply $p['prodName']";
			// }
			// else {
			// 	echo "Can't supply $p['prodName']";
			// }
			// echo ($orderedItem["quantity"] <= $p['prodStockLevel']);
		}

		if ($returnData == []) {
			$db -> commit();
		}
		echo json_encode($returnData);
	};

	function addProductToOrder($db, $orderedItem){
		$query = $db->prepare('INSERT INTO `order` VALUES (:name, :houseNum, :city, :postcode, :phone, :email, :prodId, :quantity)'); 

		$array = array(
			'name' => $_POST['name'],
			'houseNum' => $_POST['houseNum'],
			'city' => $_POST['city'],
			'postcode' => $_POST['postcode'],
			'phone' => $_POST['phone'],
			'email' => $_POST['email'],
			'prodId' => $orderedItem["prodId"],
			'quantity' => $orderedItem["quantity"]
        );

        $result = $query->execute($array);
	}

?>