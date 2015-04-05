<?php
/*
    Router, all requests sent to api directory forwarded here.
    URLs of type api/data/args converted to array.
    Determine method then data. Call functions in dbLib to process commands
*/
include_once "utils.php";
include_once "dbLib.php";
$requestParameters = parseArgsList($_SERVER['REQUEST_URI']);
// var_dump($requestParameters);

if(!isset($db)) {
    $db = createConnection();
}

switch($_SERVER['REQUEST_METHOD']) {
    case "POST":                    // Creation
        echo "<strong><code>Post</code></strong>: <br>";
        switch($requestParameters[0]) {
            case 'product':
                insertProduct($db, $_POST["prodId"], $_POST["prodParent"], $_POST["prodCat"], $_POST["prodURL"], $_POST["prodCap"]);
                fetchAll($db, "product");

                // $retValue = "prodId " . $_POST["prodId"] . "\n " .
                //     "prodParent " . $_POST["prodParent"] . "\n " .
                //     "prodCat " . $_POST["prodCat"] . "\n " .
                //     "prodURL <a href=' " . $_POST["prodURL"] . "'>" .$_POST["prodURL"] .  "</a> \n " .
                //     "prodCap " . $_POST["prodCap"] ;
                // echo nl2br ($retValue);     // \n to <br>
                // // Process formdata into a product using prepared statement
                break;
            
            default:
                echo "This data cannot be posted";
                // Responder with negative feedback
                break;
        }
        break;

    case "GET":
        echo "<strong><code>Get</code></strong>: <br>";
        fetchAll($db, "product");
        break;

    case "PUT":                     // Update
        echo "<strong><code>Put</code></strong>: <br>";
        break;

    case "DELETE":
        echo "<strong><code>Delete</code></strong>: <br>";
        switch($requestParameters[0]) {
            case 'product':
                deleteProduct($db, "8");
                fetchAll($db, "product");
                break;
            
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
