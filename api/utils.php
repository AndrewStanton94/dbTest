<?php

/*
    Dumping ground for misc php functions, will relocate when appropriate trends appear.
*/

    function parseArgsList(){
        // $path = explode('/', ltrim($value, "/"));
        // return array_slice($path, 2);

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
        $queryArray = array();
        $query = explode("&", $query);  // Key: value pairs
        foreach ($query as $q) {
            $q = explode("=", $q);
            $queryArray[$q[0]] = $q[1];
        }
        return $queryArray;
    }
?>
