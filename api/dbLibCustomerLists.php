<?php
/*
    Functions to create, delete and update data in the customerLists table
*/
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
                 $query = $db->prepare('UPDATE customerLists SET quantity = :quantity WHERE prodId = :prodId AND list = :list AND customerId = :customerId');
                $query->execute($array);
                echo "updated existing";
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
?>
