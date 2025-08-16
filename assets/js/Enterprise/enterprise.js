/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../../scss/Experience/experience.scss');


// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = window.$ = window.jQuery = require('jquery');
require('mdbootstrap-pro/js/bootstrap.min');
import bsCustomFileInput from 'mdbootstrap-pro/js/modules/vendor/bs-custom-file-input';
global.bsCustomFileInput = bsCustomFileInput;
import ('@fortawesome/fontawesome-pro/js/all');
require('mdbootstrap-pro/js/mdb.min');
const Routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';

Routing.setRoutingData(Routes);

$(document).ready(function() {

});
