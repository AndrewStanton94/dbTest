<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" type="text/css" href="<?php echo $pathToLib . "style.css" ?>">
    <?php
    	foreach ($jsToInclude as $file){
    		echo "<script src='$pathToLib$file.js'></script>";
    	}
    ?>
</head>
<body>

