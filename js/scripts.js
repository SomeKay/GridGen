/// <reference path="jquery-1.4.2-vsdoc.js" />

var js_source_dir = 'js/';
var js_files = new Array();

function includeJavaScript(jsFile)
{
  document.write('<script type="text/javascript" src="'+ jsFile + '"></script>'); 
}

js_files.push('variables.js');
js_files.push('helpers.js');
js_files.push('parts.js');
    
$.each(js_files, function(index, element) {
    var js_source_tag = '<script src="' + js_source_dir + element + '" type="text/javascript"></script>';
    
    includeJavaScript(js_source_dir + element);
});