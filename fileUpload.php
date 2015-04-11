<script src="lib/ajax.js"></script>
<script>
    var form, callbackDiv, ajaxReturnedValue;

    function prepareFile(evt){
        evt.preventDefault();
        var data = new FormData(form);
        ajaxPost('fileUploadSS.php', data, callback);
    }

    window.addEventListener('load', function(e){
        console.log('Set up');
        form = document.getElementById('form');
        callbackDiv = document.getElementById('callbackDiv');
        form.addEventListener('submit', prepareFile);
    });
</script>

<form id="form" enctype="multipart/form-data">  // enctype set to this for all forms with input[file]
    <input type="file" name="image" />
    <input type="submit"/>
</form>
<div id="callbackDiv">
</div>
