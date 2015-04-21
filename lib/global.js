'use strict';
var

toggleVisibility = function(event){
    var section = event.target.parentElement,
        forms = section.getElementsByTagName('form');
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].style.display === 'none'){
                forms[i].style.display = 'block';
                event.target.className = 'expanded';
            }
            else{                   // Default to set a value if empty.
                forms[i].style.display = 'none';
                event.target.className = 'folded';
            }
        };
};

window.addEventListener('load', setUp);
