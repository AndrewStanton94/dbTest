<?php
    function insertList($db){
        $list = $_POST["customerLists"];    // true => associative array, not stdObject
        $list = json_decode($list, true);

        if (!isset($list)){
            echo "Nothing in list";
            return;
        }

        foreach ($list as $listItem){ //foreach list item
            addItem($db, $listItem);
        }
    };

    function addItem($db, $listItem){
            $query = $db->prepare('INSERT INTO customerLists VALUES(:customerId, :list, :prodId, :quantity)');
                        // echo "<br><br>list " . $listItem['list'];
                        // echo "<br>prodId " . $listItem['prodId'];
                        // echo "<br>qty " . $listItem['quantity'];
            try {
                // print_r($listItem);
                    $array = array(
                        'customerId' => 0,
                        'list'       => $listItem['list'],
                        'prodId'     => $listItem['prodId'],
                        'quantity'   => $listItem['quantity']
                    );

                    $result = $query->execute($array);
                    echo "Added new product";
                    // echo json_encode($result);
            }
            catch (Exception $e) {
                // echo $e;
                // $errorcode = $db->errorInfo()[1];
                // switch ($errorcode) {
                    // case 1062:
                        // echo "<p><strong>Already here. Update.</strong></p>";
                         $query = $db->prepare('UPDATE customerLists
                                SET quantity = :quantity
                                WHERE prodId = :prodId AND list = :list AND customerId = :customerId');
                        // echo $query->execute($array);
                        $query->execute($array);
                        echo "updated existing";
                    // break;

                // default:
                    // echo "Error code: $errorcode ";
                    // break;
                // } 
            }
        }

    function deleteList($db, $prodId){
        if ($prodId == '*'){
            $db->query("DELETE FROM customerLists");
        }
        else{
            $query = $db->prepare('DELETE FROM customerLists WHERE prodId = :prodId AND list = :list AND customerId = :customerId');
            $array = array(
                'customerId' => 0,
                'list'       => 'basket',
                'prodId'     => $prodId,
            ); 
     
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
