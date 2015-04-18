<?php
    function insertList($db){
        $lists = json_decode($_POST["customerLists"], true);    // true for associative array, not stdObject
        foreach ($lists as $listName => $list) {
            // var_dump($list);
            // echo('<br>');
            processList($db, $listName, $list);
        }

        // print_r($out);

        // $out = json_decode($_POST["customerLists"]);
        // echo $_POST['customerLists'];
    };

    function processList($db, $listName, $list){
        $query = $db->prepare('INSERT INTO customerLists VALUES(:customerId, :list, :prodId, :quantity)');
        echo "<br>processing list $listName <br>";
        foreach ($list as $product) {   // still { product: order}
            // var_dump($product['product']);
            echo $product['product']['prodName'];
            echo $product['quantity'];
            
            $array = array(
                'customerId' => 0,
                'list'       => $listName,
                'prodId'     => $product['product']['prodId'],
                'quantity'   => $product['quantity']
            );
     
            $result = $query->execute($array);
            echo json_encode($result);
        }
    };

    // function deleteList($db, $prodId)
    // {
    //     $query = $db->prepare('DELETE FROM customerLists WHERE prodId = :prodId');
    //     $array = array('prodId' => $prodId);
 
    //     $query->execute($array);
    // };

    // function editList($db){
    //     $query = $db->prepare('UPDATE customerLists
    //                             SET prodName = :prodName,
    //                                 prodCategory = :prodCategory,
    //                                 prodDescription = :prodDescription,
    //                                 prodPrice = :prodPrice,
    //                                 prodStockLevel = :prodStockLevel,
    //                                 prodManufacturer = :prodManufacturer
    //                             WHERE prodId = :prodId');
    //     $array = array(
    //         'prodId'           => $_POST["prodId"],
    //         'prodName'         => $_POST["prodName"],
    //         'prodCategory'     => $_POST["prodCategory"],
    //         'prodDescription'  => $_POST["prodDescription"],
    //         'prodPrice'        => $_POST["prodPrice"],
    //         'prodStockLevel'   => $_POST["prodStockLevel"],
    //         'prodManufacturer' => $_POST["prodManufacturer"]
    //         );

    //     $query->execute($array);
    // }
?>
