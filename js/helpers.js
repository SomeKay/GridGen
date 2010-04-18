/**
 * Sređuje sve potrebne stvari kod promjene broja stupaca.
 */
function switchColumns(new_num_of_columns) {
    var $columns_holder = $('div#elements ul');

    // Generiranje elemenata za listu elemenata
    var new_columns_html =
            '<li id="hor">' +
            '<p>Horizontalni element</p>' +
            '</li>';
    
    // Popunjavanje liste
    for (i = 1; i <= new_num_of_columns; i++) {
        new_columns_html +=
            '<li class="element col_' + i + '">' +
            '<p>Broj stupaca: ' + i + '</p>' +
            '<div id="col_' + i + '"></div>' +
            '</li>';
    }
    $columns_holder.html(new_columns_html);

    // Popravci
    fixExistingElements(new_num_of_columns);
    // Novi broj stupaca
    num_of_columns = new_num_of_columns;

    fixDraggable();
    styleElements();
    makeContainerDroppable();
    makeHorizontalDroppable();
    makeElementDroppable();

    fixStyleSheet();
}

/**
* Popravlja sve CSS-ovske vrijednosti u odnosu na trenutno stanje parametara generatora.
*/
function fixStyleSheet() {
    // Container
    $('div#container').css('width', (parseInt(container_width) + 20) + 'px');
    $('div#tabs_1, div#tabs_2, div#tabs_3').css('width', container_width + 'px');

    var new_css = generateCSS();

    $('style[title="params"]').text(new_css);
}

/**
* Popravlja sve postojeće elemente s obzirom na novi broj stupaca.
*/
function fixExistingElements(new_num_of_columns) {
    if (parseInt(new_num_of_columns) < parseInt(num_of_columns)) {
        $('div[class^="col_"]').each(function () {
            var $div = $(this);

            if (parseInt($div.attr('rel')) > new_num_of_columns)
                $div.remove();
        });
    }
    else if (new_num_of_columns > num_of_columns) {

    }

    // Nova širina stupca = Širina prostora - margine - padding prostora
    column_width = parseInt((container_width - (margin_width * (new_num_of_columns - 1)) - (container_padding * 2)) / new_num_of_columns);
    $column_width.val(column_width);

    // Broj stupaca u modal dialogu
    var column_options = '';
    for (i = 1; i <= new_num_of_columns; i++) {
        column_options += '<option value="' + i + '">' + i + '</option>';
    }
    $modal.find('select#element_columns').html(column_options);
}

/**
 * Popravlja sve elemente koji su "nosivi".
 * Vraća im mogućnost "nošenja".
 *
 */
function fixDraggable() {
    var $elements = $('div#elements ul li');
    
    $elements.draggable({
        revert: 'invalid',
        helper: 'clone'
    });
}

/**
 * Uređuje elemente u popisu elemenata dajući im oznake o širini pojedinog
 * stupca.
 */
function styleElements() {
    var width = 160;
    var $list = $('div#elements ul li');
    var multiplicator = $list.length - 1;
    
    $list.each(function() {
        var $item = $(this);
        
        if ($item.attr('id') != 'hor') {
            var num_of_columns = parseInt($item.find('div').attr('id').split('_')[1]);
            var fill_width = (num_of_columns / multiplicator) * 100;
        
            $item.find('div').not('#hor').progressbar({ value: fill_width });
        }
    });
}

/**
* Postavlja novu širinu prostora za elemente.
* Mijenja širinu stupaca kako bi nova širina bila prikazana kako treba.
*/
function changeContainerWidth() {
    var new_container_width = $container_width.val();
    var new_column_width = parseInt((new_container_width - (container_padding * 2) - (margin_width * (num_of_columns - 1))) / num_of_columns);

    $column_width.val(new_column_width);

    container_width = new_container_width;
    column_width = new_column_width;

    fixStyleSheet();
}

/**
* Postavlja novu širinu stupaca.
* Mijenja širinu prostora za elemente kako bi nova širina bila prikazana kako treba.
*/
function changeColumnWidth() {
    var new_column_width = $column_width.val();
    // Novi container = stupci + margine + padding
    var new_container_width = num_of_columns * new_column_width;
    new_container_width += (num_of_columns - 1) * margin_width;
    new_container_width += container_padding * 2;

    column_width = new_column_width;
    container_width = new_container_width;

    $container_width.val(new_container_width);

    fixStyleSheet();
}

/**
* Postavlja novu širinu razmaka elemenata.
* Mijenja širinu prostora za elemente kako bi nova širina bila prikazana kako treba.
*/
function changeMarginWidth() {
    var new_margin_width = $margin_width.val();
    // Novi container = stupci + margine + padding
    var new_container_width = num_of_columns * column_width;
    new_container_width += (num_of_columns - 1) * new_margin_width;
    new_container_width += container_padding * 2;

    container_width = new_container_width;
    margin_width = new_margin_width;

    $container_width.val(new_container_width);

    fixStyleSheet();
}

/**
* Postavlja novu vrijednost odmaka od ruba prostora za elemente.
* Mijenja širinu prostora za elemente kako bi nova širina bila prikazana kako treba.
*/
function changeContainerPadding() {
    var new_container_padding = $container_padding.val();
    // Novi container = stupci + margine + padding
    var new_container_width = num_of_columns * column_width;
    new_container_width += (num_of_columns - 1) * margin_width;
    new_container_width += new_container_padding * 2;

    container_width = new_container_width;
    container_padding = new_container_padding;

    $container_width.val(new_container_width);

    fixStyleSheet();
}

function addControls() {
    var controls = 
        '<a href="#" class="edit_element">Uredi</a>' +
        '<a href="#" class="delete_element">Izbriši</a>';
    

    return controls;
}

/**
* Generira CSS za korisnika.
*/
function generateCSS() {
    var css =
        '/* Clearfix */\n' +
        '.clearfix:after {\n' +
        '	clear: both;\n' +
	    '    content: " ";\n' +
	    '    display: block;\n' +
	    '    font-size: 0;\n' +
	    '    line-height: 0;\n' +
	    '    visibility: hidden;\n' +
	    '    width: 0;\n' +
	    '    height: 0;\n' +
        '}\n' +
        '.clearfix {\n' +
	    '    display: inline-block;\n' +
        '}\n' +
        '* html .clearfix {\n' +
	    '    height: 1%;\n' +
        '}\n' +
        '.clearfix {\n' +
	    '    display: block;\n' +
        '}\n\n' +
        '/* Container */\n' +
        'div#elements_container {\n' +
        '    padding: 0 ' + container_padding + 'px;\n' +
        '    width: ' + (container_width - (2 * container_padding)) + 'px;\n' +
        '}\n\n' +
        '/* Margine */\n' +
        'div.margin_bottom {\n' +
        '    margin-bottom: ' + margin_width + 'px;\n' +
        '}\n' +
        'div.margin_left {\n' +
        '    margin-left: ' + margin_width + 'px;\n' +
        '}\n' +
        'div.margin_right {\n' +
        '    margin-right: ' + margin_width + 'px;\n' +
        '}\n' +
        'div.margin_top {\n' +
        '    margin-top: ' + margin_width + 'px;\n' +
        '}\n\n' +
        '/* Horizontalni element */\n' +
        'div.hor {\n' +
        '    position: relative;\n' +
        '}\n\n' +
        '/* Stupci */\n';
    for (i = 1; i < num_of_columns; i++) {
        css +=
                '    div.col_' + i + ',\n';
    }
    css +=
        '    div.col_' + num_of_columns + ' {\n' +
        '        float: left;\n' +
        '        position: relative;\n' +
        '    }\n';
    for (i = 1; i <= num_of_columns; i++) {
        var current_width = (column_width * i) + (margin_width * (i - 1));
        css +=
                '        div.col_' + i + ' {\n' +
                '            width: ' + current_width + 'px;\n' +
                '        }\n';
    }

    $('textarea#css').text(css);

    return css.replace(/\\n/g, '');
}