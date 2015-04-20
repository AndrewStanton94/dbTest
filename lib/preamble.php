<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" type="text/css" href="<?php echo $pathToRoot . "/lib/style.css" ?>">
    <?php
    	foreach ($jsToInclude as $file){
    		echo "<script src='$pathToRoot/lib/$file.js'></script>";
    	}
    ?>
</head>
<body>

<header>
<nav>
    <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Basket</a></li>
<!--         <li><a href="#"></a></li>
        <li><a href="#"></a></li>
 -->    </ul>
</nav>
</header>

