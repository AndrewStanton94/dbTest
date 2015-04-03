<?php
include "utils.php";
include "dbLib.php";
$requestParameters = parseArgsList($_SERVER['REQUEST_URI']);
// var_dump($requestParameters);

switch ($_SERVER['REQUEST_METHOD']) {
    case "POST":                    // Creation
        switch ($requestParameters[0]) {
            case 'product':
                $retValue = "prodId " . $_POST["prodId"] . "\n " .
                    "prodParent " . $_POST["prodParent"] . "\n " .
                    "prodCat " . $_POST["prodCat"] . "\n " .
                    "prodURL <a href=' " . $_POST["prodURL"] . "'>" .$_POST["prodURL"] .  "</a> \n " .
                    "prodCap " . $_POST["prodCap"] ;
                echo nl2br ($retValue);     // \n to <br>
                // Process formdata into a product using prepared statement
                break;
            
            default:
                echo "This data cannot be posted";
                // Responder with negative feedback
                break;
        }
        break;

    case "GET":
        echo "Get";
        break;

    case "PUT":                     // Update
        echo "Put";
        break;

    case "DELETE":
        echo "Delete";
        break;

    default:
        echo "Error";   
}
?>
