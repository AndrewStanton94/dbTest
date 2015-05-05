<?php
    const DBSERVER = "127.0.0.1"; // SQL DB server address
    const DBNAME = "demox";    // Name of the database to use
    const DBUSER = "root";  // User with read/write DB permission
    const DBPW = "";    // Password for DB user
    const DBINIT = "CREATE TABLE IF NOT EXISTS product(prodId bigint PRIMARY KEY not null auto_increment, prodName VARCHAR(50) not null, prodCategory VARCHAR(50), prodDescription VARCHAR(500), prodPrice FLOAT not null, prodStockLevel INT not null, prodManufacturer VARCHAR(50), imageName VARCHAR(50) ); CREATE TABLE IF NOT EXISTS customerlists (customerId int(11) NOT NULL, list varchar(50) NOT NULL, prodId bigint(20) NOT NULL, quantity int(5) NOT NULL, PRIMARY KEY (customerId, list, prodId) ); CREATE TABLE IF NOT EXISTS `order` ( `name` varchar(50) NOT NULL, `houseNum` varchar(50) NOT NULL, `city` varchar(50) NOT NULL, `postcode` varchar(10) NOT NULL, `phone` varchar(10) NOT NULL, `email` varchar(50) NOT NULL, `prodId` bigint(20) NOT NULL, `quantity` int(4) NOT NULL, PRIMARY KEY (`name`,`houseNum`,`prodId`,`quantity`) )";
?>
