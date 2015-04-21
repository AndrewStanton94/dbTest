<?php
    $pageTitle = "createConfig";
    $pathToRoot = "..";
    $jsToInclude = ['json', 'ajax', 'dbSetUp', 'global'];
    include($pathToRoot . "/lib/preamble.php");
?>

<p>
	To configure the database.
	<ol>
		<li>Enter values in the form below, or leave defaults.</li>
		<li>Press Create Config.</li>
		<li>Copy the code that apears under the form to the clipboard.</li>
		<li>Go to the server, navigate to the <code>api/</code> directory.</li>
		<li>Paste the copied values into a new file called <code>config.php</code>. <strong>All lower case.</strong> </li>
		<li><a href="../api/firstTime.php">Now click here to create the tables</a></li>
	</ol>
</p>

<form id="config">
	<label for="DBSERVER">Server Address</label>
    <input type="text" autofocus required value="127.0.0.1" name = "DBSERVER" placeholder = "127.0.0.1" title="The address of the database server">

	<label for="DBNAME">Database Name</label>
    <input type="text" required value="shop" name = "DBNAME" placeholder = "shop" title="The name of the database">

	<label for="DBUSER">Database User Name</label>
    <input type="text" required value="root" name = "DBUSER" placeholder = "root" title="The name of a user with read-write permissions on the database">

	<label for="DBPW">Database Password</label>
    <input type="text" value="" name = "DBUSER" placeholder = "" title="The password of a user with read-write permissions on the database">

    <label for="DBINIT">Product Description</label>
    <textarea type="text" name = "DBINIT">CREATE TABLE IF NOT EXISTS product(prodId bigint PRIMARY KEY not null auto_increment, prodName VARCHAR(50) not null, prodCategory VARCHAR(50), prodDescription VARCHAR(500), prodPrice FLOAT not null, prodStockLevel INT not null, prodManufacturer VARCHAR(50), imageName VARCHAR(50) ); CREATE TABLE IF NOT EXISTS customerlists (customerId int(11) NOT NULL, list varchar(50) NOT NULL, prodId bigint(20) NOT NULL, quantity int(5) NOT NULL, PRIMARY KEY (customerId, list, prodId) ); CREATE TABLE IF NOT EXISTS `order` ( `name` varchar(50) NOT NULL, `houseNum` varchar(50) NOT NULL, `city` varchar(50) NOT NULL, `postcode` varchar(10) NOT NULL, `phone` varchar(10) NOT NULL, `email` varchar(50) NOT NULL, `prodId` bigint(20) NOT NULL, `quantity` int(4) NOT NULL, PRIMARY KEY (`name`,`houseNum`,`prodId`,`quantity`) )</textarea>

    <input type="submit" value="Create config">
</form>
<pre id="output">
	
</pre>

<?php
    include($pathToRoot . "/lib/footer.php");
?>
