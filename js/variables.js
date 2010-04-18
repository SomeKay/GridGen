/// <reference path="jquery-1.4.2-vsdoc.js" />

// Broj stupaca u gridu
var num_of_columns = 4;
// �irina containera
var container_width = 960;
// �irina jednog stupca
var column_width = 220;
// Udaljenost elemenata od containera
var container_padding = 10;
// �irina razmaka me�u elementima
var margin_width = 20;
// Najve�i mogu�i broj stupaca
var max_columns = 16;

// Modal dialog
$modal = $('div#modal');
// Drop down za broj stupaca
var $column_selector = $('select#column_selector');
// Input za �irinu stupca
var $column_width = $('input#column_width');
// Input za �irinu containera
var $container_width = $('input#container_width');
// Input za �irinu margine
var $margin_width = $('input#margin_width');
// Input za �irinu paddinga container
var $container_padding = $('input#container_padding');