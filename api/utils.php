<?php

/*
    Dumping ground for misc php functions, will relocate when appropriate trends appear.
*/

    function parseArgsList(){
        // Get path and arguments of the URL of the latest request

        $url = $_SERVER['REQUEST_URI'];

        // Get path after api/ as array
        $path = parse_url($url,PHP_URL_PATH);
        $path = explode("/", trim($path, "/")); // trim to prevent empty array elements
        $index = array_search('api', $path);
        $path = array_slice($path, $index + 1);

        $arr = array(
            'path' => $path,
            'query' => queryToAArray(parse_url($url, PHP_URL_QUERY))
            );
        return $arr;
    }

    function queryToAArray($query){
        // URL query given as single string, convert to associative array
        
        // var_dump($query);
        if($query == ""){
            return;
        }
        $queryArray = array();
        $query = explode("&", $query);  // Key: value pairs
        foreach ($query as $q) {
            $q = explode("=", $q);
            $queryArray[$q[0]] = $q[1];
        }
        return $queryArray;
    }


    function saveImage(){
        if(isset($_FILES['productImage'])){
            $errors= array();
            $file_name = $_FILES['productImage']['name'];
            $file_tmp = $_FILES['productImage']['tmp_name'];   // Server allocated name
            $file_ext = strtolower(end(explode('.', $file_name)));

            if(in_array($file_ext, array('jpeg','jpg','png'))){
                if($_FILES['productImage']['size'] < 2097152){
                    // echo "Trying to rename: utils.php @ saveImage";
                    move_uploaded_file($file_tmp, "../images/".$file_name);
                    return $file_name;
                }
                else{
                    $errors[]='File size must be at most 2 MB';
                }
            }
            else{
                $errors[]='extension not allowed, please choose a JPEG or PNG file.';
            }

            echo json_encode($errors);
            return false;
        }
    }
?>
