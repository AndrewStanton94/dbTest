<?php
/*
    Router, all requests sent to api directory forwarded here.
    URLs of type api/data/args converted to array.
    Determine method then data. Call functions in dbLib to process commands
*/

include_once "utils.php";
$requestParameters = parseArgsList();

// if(!file_exists(__DIR__.'/config.php')) {
//     // fail("<b>Hold on Sparky!</b> You need to copy the contents of the <code>config_sample.php</code> file into a new <code>config.php</code> file and fill in the database details, or Linora can't store and retrieve your links.");
//     if ($requestParameters["path"][0] == "setUpConfig") {
//         echo "make the file";
//         return;
//     }
// }

include_once "dbLib.php";
include_once "dbLibCustomerLists.php";

if(!isset($db)) {
    $db = createConnection();
}

// header('Content-Type: text/json');
switch($_SERVER['REQUEST_METHOD']) {
    case "POST":                    // Creation
        // echo "<strong><code>Post</code></strong>: <br>";
        // print_r($requestParameters);
        switch($requestParameters["path"][0]) {
            case 'product':
                switch ($requestParameters['path'][1]) {
                    case 'modify':
                        editProduct($db);
                        return;
                    
                    default:
                        insertProduct($db);
                        return;
                // echo "May have saved the data index.php @ post/product";
                }
            case 'customerList':
                insertList($db);
                break;

            default:
                echo "This data cannot be posted. Was given uri: ";
               var_dump($_SERVER['REQUEST_URI']); 
                // Responder with negative feedback
                break;
        }
        break;

    case "GET":
        // echo "<strong><code>Get</code></strong>: <br>";
        switch($requestParameters["path"][0]) {
            case 'product':
                fetchAll($db, "product");
                break;

            case 'customerList':
                fetchAll($db, "customerLists");
                break;

            default:
                echo "This data cannot be fetched. Was given uri: ";
               var_dump($_SERVER['REQUEST_URI']); 
                // Responder with negative feedback
                break; 
        }
        break;

    case "PUT":                     // Update
        // echo "<strong><code>Put</code></strong>: <br>";
        print_r($requestParameters);
        break;

    case "DELETE":
        // echo "<strong><code>Delete</code></strong>: <br>";
        switch($requestParameters["path"][0]) {
            case 'product':
                if (count($requestParameters["path"]) == 2){
                    deleteProduct($db, $requestParameters["path"][1]);
                    return;
                }

            case 'customerList':
                if (count($requestParameters["path"]) == 2){
                    deleteList($db, $requestParameters["path"][1]);
                    return;
                }
            
            default:
                echo "This data cannot be deleted";
                // Responder with negative feedback
                http_response_code(400);     //'Bad Request', 
                break;
        }
        break;

    default:
        echo "<strong>Error: unexpected method. Can handle <code>POST</code>, <code>GET</code>, <code>DELETE</code></strong>";   
        http_response_code(405);     //'Method Not Allowed', 
}

$db = null;
?>
