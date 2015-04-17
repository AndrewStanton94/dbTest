<?php
	function fetchAll($db, $table){
        try{
            $query = $db->query('SHOW TABLES LIKE "' . $table . '"');   // Have we got connection to db
            $query = $db->query('SELECT * FROM ' . $table);
            $result = $query->fetchAll(PDO::FETCH_ASSOC);     // Try query. Fails if table not exist
        }
        catch(PDOException $e){
            // echo "RESULT of SHOW TABLES LIKE $table<br>";
            // var_dump($query);
            echo "Error while fetching data. DEALING with it";
            prepareDatabase($db);
            $result = $query->fetchAll(PDO::FETCH_ASSOC);     // Retry query. Fails if table not exist
        }
        // print_r($result);
        echo json_encode($result);
    };

    function insertProduct($db){
        $query = $db->prepare('INSERT INTO product VALUES(:prodId, :prodName, :prodCategory, :prodDescription, :prodPrice, :prodStockLevel, :prodManufacturer, :imageName)');
        // $imageName = saveImage();   // Filename or False
        // echo $imageName;
        // $imageName = $imageName ? $imageName : null;
        $si = saveImage();
        // var_dump($si);
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
        // print_r($query);
    };

    function deleteProduct($db, $prodId)
    {
        $query = $db->prepare('DELETE FROM product WHERE prodId = :prodId');
        $array = array('prodId' => $prodId);
 
        $query->execute($array);
        // print_r($query);
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
            // 'imageName'=> $si 
            );

        $query->execute($array);
    }
?>