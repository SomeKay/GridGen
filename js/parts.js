/// <reference path="jquery-1.4.2-vsdoc.js" />

initialize();

function initialize() {
    $('a[href="#"]').live('click', function(e){
        e.preventDefault();
    });
    
    $('div#container').tabs();
    $('div[id^="tabs_"]').removeClass('ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide')
    $('div#container').removeClass('ui-widget-content ui-corner-all');
    $('ul#tabs').removeClass('ui-widget-header ui-corner-all');

    switchColumns(4);

    enableDialogs();
    enableColumns();
    enableOptions();
    enableModal();

    $('div#tabs_2, div#tabs_3').addClass('ui-tabs-hide');
}

/**
* Postavlja dialoge (postavke, popis elemenata i modalni dialog za postavke pojedinog elementa).
*/
function enableDialogs() {
    $('div#elements').dialog({
        height: 340,
        position: [178, 190],
        resizable: false,
        width: 215
    });
    $('div#modal').dialog({
        autoOpen: false,
        modal: true
    });
}

/**
* Omoguæava mijenjanje broja stupaca dropdown elementom.
*/
function enableColumns() {
    $column_selector.change(function () {
        var columns = $column_selector.val();

        switchColumns(columns);
    });
}

/**
* Omoguæava pokretanje promjene širine prostora, širine stupca, odmaka od ruba prostora i širine razmaka meðu stupcima.
*/
function enableOptions() {

    $('a.container_width').click(changeContainerWidth);
    $('a.column_width').click(changeColumnWidth);
    $('a.margin_width').click(changeMarginWidth);
    $('a.container_padding').click(changeContainerPadding);

}

/**
 * Omoguæava smještanje horizontalnog elementa u prostor za elemente.
 */
function makeContainerDroppable() {
    $('div#elements_container').droppable({
        accept: 'li#hor',
        hoverClass: 'drophover',
        drop: function (event, ui) {
            $(this).append('<div class="hor clearfix margin_bottom">' /*addControls()*/ + '</div>');
            $(this).sortable();
            makeHorizontalDroppable();
            fixStyleSheet();
            enableModal();
        }
    });
}

/**
* Omoguæava smještanje elemenata u horizontalni element.
*/
function makeHorizontalDroppable() {
    $('div.hor').droppable({
        accept: 'div#elements ul li.element',
        hoverClass: 'drophover',
        drop: function (event, ui) {
            var name = ui.draggable.find('div').attr('id');

            var number = name.substr(4);
            $(this).append('<div class="' + name + ' margin_right" rel="' + number + '">' + addControls() + '</div>');
            $('div.hor').sortable();
            makeElementDroppable();
            fixStyleSheet();
            enableModal();
            //checkMarginControls();
        }
    });
}

/**
* Omoguæava smještanje elemenata u elemente.
*/
function makeElementDroppable() {
    $('div[class^="col_"]').droppable({
        accept: 'div#elements ul li.element',
        hoverClass: 'drophover',
        greedy: true,
        drop: function (event, ui) {
            var name = ui.draggable.find('div').attr('id');
            var number = parseInt(name.substr(4));

            if (parseInt($(this).attr('rel')) >= number) {
                $(this).append('<div class="' + name + '" rel="' + number + '">' + addControls() + '</div>');
                $('div[class^="col_"]').sortable();
            }
            //checkMarginControls();
            makeElementDroppable();
            fixStyleSheet();
            enableModal();
        }
    });
}

/**
* Omoguæava upravljanje postavkama pojedinog elementa pomoæu modalnog dialoga
*/
function enableModal() {
    $('a.edit_element').bind('click', function (event) {
        // Postavke elementa kojeg se ureðuje
        var $dblclicked = $(this).parent();
        var has_margin_right = $dblclicked.hasClass('margin_right');
        var has_margin_left = $dblclicked.hasClass('margin_left');
        var has_margin_top = $dblclicked.hasClass('margin_top');
        var has_margin_bottom = $dblclicked.hasClass('margin_bottom');
        var columns = $dblclicked.attr('rel');

        // Provjera postojeæih margina
        if (has_margin_right)
            $('a#element_margin_right').addClass('active');
        else
            $('a#element_margin_right').removeClass('active');
        if (has_margin_left)
            $('a#element_margin_left').addClass('active');
        else
            $('a#element_margin_left').removeClass('active');
        if (has_margin_top)
            $('a#element_margin_top').addClass('active');
        else
            $('a#element_margin_top').removeClass('active');
        if (has_margin_bottom)
            $('a#element_margin_bottom').addClass('active');
        else
            $('a#element_margin_bottom').removeClass('active');

        // Ureðivanje dropdowna s brojem stupaca
        $('select#element_columns option[value="' + columns + '"]').attr('selected', true);
        $('select#element_columns').unbind();
        $('select#element_columns').change(function () {
            var new_columns = $(this).val();
            var allowed = true;

            // Provjera postoje li elementi djeca koji su veæi od nove velièine elementa
            for (i = parseInt(new_columns) + 1; i <= max_columns; i++) {
                if ($dblclicked.find('div.col_' + i).length > 0)
                    allowed = false;
            }

            // Ako ne postoje veæi elementi djeca, treba izmijeniti broj stupaca elementa
            if (allowed) {
                $dblclicked.removeClass('col_' + columns).addClass('col_' + new_columns).attr('rel', new_columns);
                columns = new_columns;
                enableModal();
                fixStyleSheet();
            }
        });

        // Postavljanje klikova na element koji se ureðuje
        $('a#element_margin_right, a#element_margin_left, a#element_margin_top, a#element_margin_bottom').unbind();
        $('a#element_margin_right, a#element_margin_left, a#element_margin_top, a#element_margin_bottom').click(function () {
            var $clicked = $(this);
            var margin_direction = $clicked.attr('id').split('_');
            margin_direction = margin_direction[1] + '_' + margin_direction[2];

            $dblclicked.toggleClass(margin_direction);
            $clicked.toggleClass('active');
            fixStyleSheet();
        });

        // Otvaranje dijaloga
        $modal.dialog('open');
    });
}