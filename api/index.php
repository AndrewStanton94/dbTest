<?php
    // echo "Hi";
    // // Doesn't return this

	// $sRequest = $_POST["prodId"];
	// $sResponse = $sRequest . " :Your request has been seen by syam";
	// echo $sResponse;

	$retValue = "prodId " . $_POST["prodId"] . "\n " .
		" prodParent " . $_POST["prodParent"] . "\n " .
		"prodCat " . $_POST["prodCat"] . "\n " .
		"prodURL <a href=' " . $_POST["prodURL"] . "'>" .$_POST["prodURL"] .  "</a> \n " .
		"prodCap " . $_POST["prodCap"] ;
	echo nl2br ($retValue);
?>