<?php
    $pageTitle = "Home";
    $pathToRoot = ".";
    $jsToInclude = ['json', 'ajax', 'dnd', 'productPage', 'global'];
    include($pathToRoot . "/lib/preamble.php");
?>

<article>
    <input type="search" name="productSearch" id="productSearch" value="" placeholder="Product Search">

    <section id="productList">
    <h1>Products for sale</h1>
    </section>

    <section id="customerLists">
    <h1>Your Basket</h1>
    </section>

</article>
<?php
    include($pathToRoot . "/lib/footer.php");
?>
