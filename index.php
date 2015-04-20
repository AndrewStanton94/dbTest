<?php
    $pageTitle = "Home";
    $pathToRoot = ".";
    $jsToInclude = ['json', 'ajax', 'dnd', 'productPage', 'global'];
    include($pathToRoot . "/lib/preamble.php");
?>

<article>
    <section id="productList">
    </section>

    <section id="customerLists">
    <h1>Your Basket</h1>
    </section>

    <div id="callbackDiv">
        
    </div>
</article>
<?php
    include($pathToRoot . "/lib/footer.php");
?>
