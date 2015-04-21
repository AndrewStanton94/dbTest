<?php
	$pageTitle = "Stock control";
	$pathToRoot = "..";
	$jsToInclude = ['json', 'ajax', 'cms', 'global'];
	include($pathToRoot . "/lib/preamble.php");
?>

    <section id="productCreation">
        <h1 id="productCreationTitle" class="expanded">Product Creation</h1>
        <form id="createForm" enctype="multipart/form-data">
                <label for="prodName">Product Name</label>
                <input type="text" autofocus required name = "prodName" placeholder = "prodName">

                <label for="productDescription">Product Description</label>
                <textarea type="text" required name = "prodDescription" placeholder = "prodDescription"></textarea>

                <label for="prodPrice">Product Price</label>
                <input type="number" required name = "prodPrice" placeholder = "prodPrice" min=1 step="any">
                <!-- Step=any to permit fractions -->

                <label for="prodStockLevel">Current Stock Level</label>
                <input type="number" required name = "prodStockLevel" placeholder = "prodStockLevel" step=1 min=0>

            <label for="prodCategory">Product Category</label>
            <input type="text" value="fffjdak" name = "prodCategory" placeholder = "prodCategory">

            <label for="productManufacturer">Product Manufacturer</label>
            <input type="text" value="fffjdak" name = "prodManufacturer" placeholder = "prodManufacturer">

            <label for="productImage">Product Image</label>
            <input type="file" name="productImage" />

            <input type="submit" name="Add to database">
        </form>
        </section>

        <div id="callbackDiv">
        </div>

        <section id="productDeletion">
        <h1 id="productDeletionTitle" class="expanded">Product Deletion</h1>
        <form id = "deleteForm">
            <label for="valueToDelete">Select product to delete</label>
            <select id="valueToDelete">
    <!--             <option value="1" data-id=0>A skill</option>
                <option value="2" data-id=1>Another skill</option>
                <option value="3" data-id=2>Yet another skill</option>
     -->
            </select>
            <input type="submit" name="Delete from database">
        </form>
        </section>


        <section id="productModification">
        <h1 id="productModificationTitle" class="expanded">Product Modification</h1>

        <form id="selectToEdit">
            <label for="valueToModify">Select product to edit</label>
            <select id="valueToModify"> </select>
            <input id="selectProdToMod" type="submit" name="Choose for modification">
        </form>

        <form id="modifyForm" enctype="multipart/form-data">
                <input type="text" required readonly="readonly" value="fffjdak" name = "prodId">

                <label for="prodName">Product Name</label>
                <input type="text" autofocus required name = "prodName">

                <label for="productDescription">Product Description</label>
                <textarea type="text" required name = "prodDescription"></textarea>

                <label for="prodPrice">Product Price</label>
                <input type="number" required name = "prodPrice" min=1 step="any">

                <label for="prodStockLevel">Current Stock Level</label>
                <input type="number" required name = "prodStockLevel" step=1 min=0>

            <label for="prodCategory">Product Category</label>
            <input type="text" name = "prodCategory">

            <label for="productManufacturer">Product Manufacturer</label>
            <input type="text" name = "prodManufacturer">

            <input type="submit" name="Add to database">
        </form>
    </section>

<?php
	include($pathToRoot . "/lib/footer.php");
?>
