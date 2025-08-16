/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../scss/base.scss');


// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = window.$ = window.jQuery = require('jquery');
require('mdbootstrap-pro/js/bootstrap.min');
bsCustomFileInput = require('mdbootstrap-pro/js/modules/vendor/bs-custom-file-input');
import ('@fortawesome/fontawesome-pro/js/all');
require('mdbootstrap-pro/js/mdb.min');

$(document).ready(function() {
    $('.mdb-select').materialSelect();
});
