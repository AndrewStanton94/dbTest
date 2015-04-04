<?php

/*
    Dumping ground for misc php functions, will relocate when appropriate trends appear.
*/

    function parseArgsList($value=''){
        $path = explode('/', ltrim($value, "/"));
        return array_slice($path, 2);
    }
?>
