/// <reference path="jquery-1.4.2-vsdoc.js" />

// Broj stupaca u gridu
var num_of_columns = 4;
// Širina containera
var container_width = 960;
// Širina jednog stupca
var column_width = 220;
// Udaljenost elemenata od containera
var container_padding = 10;
// Širina razmaka meðu elementima
var margin_width = 20;
// Najveæi moguæi broj stupaca
var max_columns = 16;

// Modal dialog
$modal = $('div#modal');
// Drop down za broj stupaca
var $column_selector = $('select#column_selector');
// Input za širinu stupca
var $column_width = $('input#column_width');
// Input za širinu containera
var $container_width = $('input#container_width');
// Input za širinu margine
var $margin_width = $('input#margin_width');
// Input za širinu paddinga container
var $container_padding = $('input#container_padding');