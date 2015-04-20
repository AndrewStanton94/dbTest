<?php
    $pageTitle = "Home";
    $pathToRoot = ".";
    $jsToInclude = ['json', 'ajax', 'dnd', 'productPage', 'global'];
    include($pathToRoot . "/lib/preamble.php");
?>

<article>
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
</article>
<?php
    include($pathToRoot . "/lib/footer.php");
?>
