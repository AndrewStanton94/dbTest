<?php
    const DBSERVER = "127.0.0.1"; // SQL DB server address
    const DBNAME = "demo";    // Name of the database to use
    const DBUSER = "root";  // User with read/write DB permission
    const DBPW = "";    // Password for DB user

    function createConnection(){
        // DatabaseSourceName: URL, DatabaseName, Encoding
        $dsn = "mysql:" . DBSERVER . ";dbname=".DBNAME."&charset=utf8;";
        // Use exceptions, quick fix for sqlInjection charset exploit, keep connection alive
        $options = array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false, // LAZY FIX see http://stackoverflow.com/questions/134099/are-pdo-prepared-statements-sufficient-to-prevent-sql-injection/12202218#12202218 
            PDO::ATTR_PERSISTENT => true    // Investigate ramifications
        );      // => MEANS . Access object attr
                // :: MEANS   Scope modification

        try {
            $db = new PDO($dsn, DBUSER, DBPW, $options); 
            echo "<strong>Connection established</strong><br>";

            $db->exec("USE ".DBNAME); // MySQL-only

            // $query = $db->query('SELECT * FROM entries');
            // // One result
            // // $fetch = $query->fetch(PDO::FETCH_ASSOC);
            // // All results
            // $fetch = $query->fetchAll(PDO::FETCH_ASSOC);
            // print_r($fetch);
            return $db;
        }
        catch(PDOException $e){
            echo "<strong>There was an error with the connection</strong><br>";
            echo "gm: " . $e->getMessage() . "<br>";
            // echo "eC: " . $db->errorCode() . "<br>";
            // http://docstore.mik.ua/orelly/java-ent/jenut/ch08_06.htm 
            // echo "eI ";
            // var_dump($db->errorInfo());
        }
    }

    function fetchAll($db, $table)
    {
        $query = $db->query('SELECT * FROM ' . $table);
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        print_r($result);
    }

    function insertProduct($db, $prodId, $prodParent, $prodCat, $prodURL, $prodCap)
    {
        $query = $db->prepare('INSERT INTO entries VALUES(:prodId, :prodParent, :prodCat, :prodURL, :prodCap)');
        $array = array(
            'prodId'     => $prodId,
            'prodParent' => $prodParent,
            'prodCat'    => $prodCat,
            'prodURL'    => $prodURL,
            'prodCap'    => $prodCap
        );
 
        $query->execute($array);
        // print_r($query);
    }

    function deleteProduct($db, $prodId)
    {
        $query = $db->prepare('DELETE FROM entries WHERE id = :prodId');
        $array = array('prodId' => $prodId);
 
        $query->execute($array);
        // print_r($query);
    }
?>
