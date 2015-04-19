<?php
    $pageTitle = "Home";
    $pathToLib = "lib/";
    $jsToInclude = ['json', 'ajax', 'dnd', 'productPage', 'global'];
    include($pathToLib . "preamble.php");
?>

<section id="productList">
    <section class='product' draggable="true" data-id="42">
        <h1>Product name</h1>
        <p>The description</p>
        <form>
            <input type="number" name="" value="">
            <input type="submit" name="" value="test">
        </form>
    </section>
</section>

<section id="customerLists">
<h1>List of stuff</h1>
</section>

<div id="callbackDiv">
    
</div>

<?php
    include($pathToLib . "footer.php");
?>
