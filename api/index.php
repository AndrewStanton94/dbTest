<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case "POST":					// Creation
		$retValue = "prodId " . $_POST["prodId"] . "\n " .
			" prodParent " . $_POST["prodParent"] . "\n " .
			"prodCat " . $_POST["prodCat"] . "\n " .
			"prodURL <a href=' " . $_POST["prodURL"] . "'>" .$_POST["prodURL"] .  "</a> \n " .
			"prodCap " . $_POST["prodCap"] ;
		echo nl2br ($retValue);		// \n to <br>
		break;

    case "GET":
    	echo "Get";
		break;

	case "PUT":						// Update
	    	echo "Put";
			break;

	case "DELETE":
	    	echo "Delete";
			break;

	default:
        echo "Error";	
}
?>