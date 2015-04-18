<?php

/*
    Functions for database interactions.
    Using prepared statements wherever possible
*/

/*
    Config info. const for protection.
    Move to config file later.

    Add code to to create db and tables if required.
*/

    include_once 'dbInit.php';

    const DBSERVER = "127.0.0.1"; // SQL DB server address
    const DBNAME = "shop";    // Name of the database to use
    const DBUSER = "root";  // User with read/write DB permission
    const DBPW = "";    // Password for DB user
    const DBINIT = "CREATE TABLE IF NOT EXISTS product(prodId bigint PRIMARY KEY not null auto_increment, prodName VARCHAR(50) not null, prodCategory VARCHAR(50), prodDescription VARCHAR(500), prodPrice FLOAT not null, prodStockLevel INT not null, prodManufacturer VARCHAR(50), imageName VARCHAR(50) ); CREATE TABLE IF NOT EXISTS customerlists (customerId int(11) NOT NULL, list varchar(50) NOT NULL, prodId bigint(20) NOT NULL, quantity int(5) NOT NULL, PRIMARY KEY (customerId, list, prodId) )";

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
            // echo "<strong>Connection established</strong><br>";

            $db->exec("USE ".DBNAME); // MySQL-only
        }
        catch(PDOException $e){
            echo "<strong>There was an error with the connection</strong><br>";
            echo "gm: " . $e->getMessage() . "<br>";
            echo "eC: " . $db->errorCode() . "<br>";
            // http://docstore.mik.ua/orelly/java-ent/jenut/ch08_06.htm 
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
            // echo "RESULT of SHOW TABLES LIKE $table<br>";
            // var_dump($query);
            echo "Error while fetching data. DEALING with it";
            prepareDatabase($db);
            $result = $query->fetchAll(PDO::FETCH_ASSOC);     // Retry query. Fails if table not exist
        }
        // print_r($result);
        echo json_encode($result);
    };

    function insertProduct($db){
        $query = $db->prepare('INSERT INTO product VALUES(:prodId, :prodName, :prodCategory, :prodDescription, :prodPrice, :prodStockLevel, :prodManufacturer, :imageName)');
        // $imageName = saveImage();   // Filename or False
        // echo $imageName;
        // $imageName = $imageName ? $imageName : null;
        $si = saveImage();
        // var_dump($si);
        $array = array(
            'prodId'           => $_POST["prodId"],
            'prodName'         => $_POST["prodName"],
            'prodCategory'     => $_POST["prodCategory"],
            'prodDescription'  => $_POST["prodDescription"],
            'prodPrice'        => $_POST["prodPrice"],
            'prodStockLevel'   => $_POST["prodStockLevel"],
            'prodManufacturer' => $_POST["prodManufacturer"],
            'imageName'        => $si 
            );
 
        $result = $query->execute($array);
        echo json_encode($result);
        // print_r($query);
    };

    function deleteProduct($db, $prodId)
    {
        $query = $db->prepare('DELETE FROM product WHERE prodId = :prodId');
        $array = array('prodId' => $prodId);
 
        $query->execute($array);
        // print_r($query);
    };

    function editProduct($db){
        $query = $db->prepare('UPDATE product
                                SET prodName = :prodName, prodCategory = :prodCategory, prodDescription = :prodDescription, prodPrice = :prodPrice, prodStockLevel = :prodStockLevel, prodManufacturer = :prodManufacturer
                                WHERE prodId = :prodId');
        $array = array(
            'prodId'           => $_POST["prodId"],
            'prodName'         => $_POST["prodName"],
            'prodCategory'     => $_POST["prodCategory"],
            'prodDescription'  => $_POST["prodDescription"],
            'prodPrice'        => $_POST["prodPrice"],
            'prodStockLevel'   => $_POST["prodStockLevel"],
            'prodManufacturer' => $_POST["prodManufacturer"]
            // 'imageName'=> $si 
            );

        $query->execute($array);
    }
?>
