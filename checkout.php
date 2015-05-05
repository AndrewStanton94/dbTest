<?php
    $pageTitle = "Checkout";
    $pathToRoot = ".";
    $jsToInclude = ['json', 'ajax', 'dnd', 'checkout', 'global'];
    include($pathToRoot . "/lib/preamble.php");
?>

<article>
    <section id="basket">
        <h1>Your basket</h1>
    </section>

    <section id="address">
        <h1>The address</h1>
        <form id="addressForm">
            <label for="name">Name</label>
            <input type="text" name="name" required>
            <label for="houseNum">House number and street</label>
            <input type="text" name="houseNum" required>
            <label for="city"> Town / city </label>
            <input type="text" name="city" required>
            <label for="postcode">Postcode</label>
            <input type="text" name="postcode" id="postcode" required pattern="^([A-PR-UWYZa-pr-uwyz0-9][A-HK-Ya-hk-y0-9][AEHMNPRTVXYaehmnprtvxy0-9]?[ABEHMNPRVWXYabehmnprvwxy0-9]? {1,2}[0-9][ABD-HJLN-UW-Zabd-hjln-uw-z]{2})$">
            <label for="phone">Phone</label>
            <input type="tel" name="phone">
            <label for="email">Email</label>
            <input type="email" name="email">
        </form>
    </section>

    <div id="callbackDiv">
        
    </div>
    <button id="buy"><h1>Go to Details</h1></button>
</article>
<?php
    include($pathToRoot . "/lib/footer.php");
?>
