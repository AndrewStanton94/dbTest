<?php
if(isset($_FILES['image'])){
    $errors= array();
    $file_name = $_FILES['image']['name'];      // Original name
    $file_tmp = $_FILES['image']['tmp_name'];   // Server allocated name
    $file_ext = strtolower(end(explode('.', $file_name)));

    if(in_array($file_ext, array('jpeg','jpg','png'))){
        if($_FILES['image']['size'] < 2097152){
            move_uploaded_file($file_tmp, "images/".$file_name);
            $errors[]='Success';
        }
        else{
            $errors[]='File size must be at most 2 MB';
        }
    }
    else{
        $errors[]='extension not allowed, please choose a JPEG or PNG file.';
    }

    echo json_encode($errors);
}
?>
