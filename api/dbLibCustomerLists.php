<?php
    function insertList($db){
        echo "in insertList";
        $query = $db->prepare('INSERT INTO customerLists VALUES(:customerId, :list, :prodId, :quantity)');
        $list = $_POST["customerLists"];    // true => associative array, not stdObject

        if (!isset($list)){
            echo "Nothing in list";
            return;
        }

        try {
            var_dump($list);
            echo('<br>');
            foreach ($list as $listItem){ //foreach list item
                    $array = array(
                        'customerId' => 0,
                        'list'       => $listItem['list'],
                        'prodId'     => $listItem['prodId'],
                        'quantity'   => $listItem['quantity']
                    );
             
                    $result = $query->execute($array);
                    // echo json_encode($result);
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
