<?php
    function prepareDatabase($db){
        // $db = createConnection();
        // echo "<br>database";
        // var_dump($db);
        // echo "<br>";
        $errorcode = $db->errorInfo()[1];
        $results = [];
        switch ($errorcode) {
            case 1007:
                echo "<p><strong>db exists already</strong></p>";
                break;

            case 1049:
                echo "<p><strong>db not found</strong></p>";
                $rows[] = $db->query("CREATE DATABASE IF NOT EXISTS " . DBNAME);
                    // fall through no db -> no table

            case 1046:
                echo "<p><strong>No database selected</strong></p>";
                $rows[] = $db->query("USE " . DBNAME);

            case 1064:
            case 1146:
                echo "<p><strong>table not found</strong></p>";
                 $rows[] = $db->query(DBINIT);
                break;

            default:
                echo "Error code: $errorcode ";
                $rows = null;
                break;
        }
        $results["rows"] = $rows;
        var_dump($results);
    }

    // prepareDatabase();
?>
