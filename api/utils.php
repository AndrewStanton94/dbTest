<?php
    function parseArgsList($value=''){
        $path = explode('/', ltrim($value, "/"));
        return array_slice($path, 2);
    }
?>
