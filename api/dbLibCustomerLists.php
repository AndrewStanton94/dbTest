<?php
    function insertList($db){
        $query = $db->prepare('INSERT INTO customerLists VALUES(:customerId, :list, :prodId, :quantity)');
        $lists = json_decode($_POST["customerLists"], true);    // true => associative array, not stdObject

        if (!isset($lists)){
            echo "Nothing in list";
            return;
        }

        try {
            foreach ($lists as $listName => $list){ //foreach customerList
                // var_dump($list);
                // echo('<br>');
                echo "<br>processing list $listName <br>";
                foreach ($list as $product) {   // foreach {product: quantity}
                    // var_dump($product['product']);
                    // echo $product['product']['prodName'];
                    // echo $product['quantity'];
                    
                    $array = array(
                        'customerId' => 0,
                        'list'       => $listName,
                        'prodId'     => $product['product']['prodId'],
                        'quantity'   => $product['quantity']
                    );
             
                    $result = $query->execute($array);
                    // echo json_encode($result);
                }
            }
        }
        catch (Exception $e) {
            echo $e;
        }
    };

    function deleteList($db, $prodId){
        if ($prodId == '*'){
            $db->query("DELETE FROM customerLists");
        }
        else{
            $query = $db->prepare('DELETE FROM customerLists WHERE prodId = :prodId');
            $array = array('prodId' => $prodId);
     
            $query->execute($array);
        }
    };

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
