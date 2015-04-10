# dbTest
practice for database aspects of coursework


## Done
+ Created html
    * Form 
    * Div container for results
+ JS
    * Get form (FormData)
    * Send to server (XMLHttpRequest)
    * Takes return data

+ PHP
    * Responder taking values from $_POST[] & returning them to user
    * Record data to databse (Prepared statements)

## Todo
+ Handle args, modifed URL to get different data. E.g. GET api/ : all data; GET api/criteria : search items matching criteria. (htaccess? review linbeta)
+ Get requests to get data in database
+ Other needed HTTP requests? 
    * HEAD
    * PUT
    * DELETE
    * OPTIONS
    (http://www.restapitutorial.com/lessons/httpmethods.html, http://www.tutorialspoint.com/http/http_requests.htm)
    
+ Restructure to get data required in coursework

### Code dump
// Build full URL and display
$url = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
echo $url;

Show everything after the host. path & args
var_dump($_SERVER['REQUEST_URI']);
