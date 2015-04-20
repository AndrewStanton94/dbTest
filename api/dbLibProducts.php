<?php 

/*
	Functions to create, delete and update data in the products table
*/
	function insertProduct($db){
        $query = $db->prepare('INSERT INTO product VALUES(:prodId, :prodName, :prodCategory, :prodDescription, :prodPrice, :prodStockLevel, :prodManufacturer, :imageName)');
        $si = saveImage();
        $array = array(
            'prodId'           => $_POST["prodId"],
            'prodName'         => $_POST["prodName"],
            'prodCategory'     => $_POST["prodCategory"],
            'prodDescription'  => $_POST["prodDescription"],
            'prodPrice'        => $_POST["prodPrice"],
            'prodStockLevel'   => $_POST["prodStockLevel"],
            'prodManufacturer' => $_POST["prodManufacturer"],
            'imageName'        => $si 
            );
 
        $result = $query->execute($array);
        echo json_encode($result);
    };

    function deleteProduct($db, $prodId)
    {
        $query = $db->prepare('DELETE FROM product WHERE prodId = :prodId');
        $array = array('prodId' => $prodId);
 
        $query->execute($array);
    };

    function editProduct($db){
        $query = $db->prepare('UPDATE product
                                SET prodName = :prodName, prodCategory = :prodCategory, prodDescription = :prodDescription, prodPrice = :prodPrice, prodStockLevel = :prodStockLevel, prodManufacturer = :prodManufacturer
                                WHERE prodId = :prodId');
        $array = array(
            'prodId'           => $_POST["prodId"],
            'prodName'         => $_POST["prodName"],
            'prodCategory'     => $_POST["prodCategory"],
            'prodDescription'  => $_POST["prodDescription"],
            'prodPrice'        => $_POST["prodPrice"],
            'prodStockLevel'   => $_POST["prodStockLevel"],
            'prodManufacturer' => $_POST["prodManufacturer"]
            );

        $query->execute($array);
    }
?>