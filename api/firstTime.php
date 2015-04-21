<?php
    include_once 'config.php';
    $dsn = "mysql:" . DBSERVER . ";dbname=".DBNAME.";";
    $option = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_PERSISTENT => true
    );
    $DB = new PDO($dsn, DBUSER, DBPW, $option);
    $DB->query("CREATE DATABASE IF NOT EXISTS " . DBNAME);
    $DB->query("USE " . DBNAME);
    $DB->query(DBINIT);
?>
