/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../../scss/Index/index.scss');
require('../../scss/LegalNotice/legalNotice.scss');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = window.$ = window.jQuery = require('jquery');
require('mdbootstrap-pro/js/bootstrap.min');
import bsCustomFileInput from 'mdbootstrap-pro/js/modules/vendor/bs-custom-file-input';
global.bsCustomFileInput = bsCustomFileInput;
require('mdbootstrap-pro/js/mdb.min');
//var Translator = require('bazinga-translator');
import ('@fortawesome/fontawesome-pro/js/all');
const Routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';

Routing.setRoutingData(Routes);

function initContactFormEvent() {
    $('#contact-modal .mdb-select').materialSelect();
    $("#contact-modal").on('hidden.bs.modal', function() {
        $('#contact-modal').remove();
    });
}

function openContactModal() {
    const url = Routing.generate('contact-form.'+$('html')[0].lang);
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('header').before(data);
            initContactFormEvent();
            $('#contact-modal').modal('show');
        }
    });
}

$(document).ready(function() {

    $('#btn-contact').click(function() {
        openContactModal();
    });

    $('#btn-contact-footer').click(function() {
        openContactModal();
    });

    $('#changeMode').change( function (value){
        loadContent(value.currentTarget.checked);
    });

    function loadContent(mode){
        let connectUrl = Routing.generate('app_login.'+$('html')[0].lang);
        let registationUrl = Routing.generate('app_register.'+$('html')[0].lang);
        if (mode) {
            connectUrl += "?mode=enterprise";
            registationUrl += "?mode=enterprise";
        }
        $('#btn-footer-registration').attr('href', registationUrl);
        $('#btn-footer-connect').attr('href', connectUrl);
        $('#btn-menu-registration').attr('href', registationUrl);
        $('#btn-menu-connect').attr('href', connectUrl);
    }
});
