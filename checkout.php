<?php
    $pageTitle = "Checkout";
    $pathToRoot = ".";
    $jsToInclude = ['json', 'ajax', 'dnd', 'checkout', 'global'];
    include($pathToRoot . "/lib/preamble.php");
?>

<article>
    <section id="basket">
        <h1>List of stuff</h1>
    </section>

    <div id="callbackDiv">
        
    </div>
    <button id="buy">Buy</button>
</article>
<?php
    include($pathToRoot . "/lib/footer.php");
?>
