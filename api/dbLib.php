<?php

/*
    Functions for database interactions.
    Using prepared statements wherever possible
    Generic library. See other lib files for actions on specific tables
*/

    include_once 'config.php';
    include_once 'dbInit.php';

    function createConnection(){
        // DatabaseSourceName: URL, DatabaseName, Encoding
        $dsn = "mysql:" . DBSERVER . ";dbname=".DBNAME."&charset=utf8;";
        // Use exceptions, quick fix for sqlInjection charset exploit, keep connection alive
        $options = array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_PERSISTENT => true,
            PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true 
        );

        try {
            $db = new PDO($dsn, DBUSER, DBPW, $options); 

            $db->exec("USE ".DBNAME); // MySQL-only
        }
        catch(PDOException $e){
            echo "<strong>There was an error with the connection</strong><br>";
            echo "gm: " . $e->getMessage() . "<br>";
            echo "eC: " . $db->errorCode() . "<br>";
            echo "eI ";
            var_dump($db->errorInfo());
            echo "<br><strong>Creating database and tables</strong><br>";
            prepareDatabase($db);
        }
        return $db;
    };

    function fetchAll($db, $table){
        try{
            $query = $db->query('SHOW TABLES LIKE "' . $table . '"');   // Have we got connection to db
            $query = $db->query('SELECT * FROM ' . $table);
            $result = $query->fetchAll(PDO::FETCH_ASSOC);     // Try query. Fails if table not exist
        }
        catch(PDOException $e){
            echo "Error while fetching data. DEALING with it";
            prepareDatabase($db);
            $result = $query->fetchAll(PDO::FETCH_ASSOC);     // Retry query. Fails if table not exist
        }
        echo json_encode($result);
    };
?>
