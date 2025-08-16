/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../../scss/User/profile.scss');


// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = window.$ = window.jQuery = require('jquery');
require('mdbootstrap-pro/js/bootstrap.min');
import bsCustomFileInput from 'mdbootstrap-pro/js/modules/vendor/bs-custom-file-input';
global.bsCustomFileInput = bsCustomFileInput;
import ('@fortawesome/fontawesome-pro/js/all');
require('cropperjs/dist/cropper.min');
require('jquery-cropper/dist/jquery-cropper.min');
require('mdbootstrap-pro/js/mdb.min');
const Routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';

Routing.setRoutingData(Routes);

function initModalEvent() {
    $( "#profile_picture_avatar" ).change(function() {
        let file = $('#profile_picture_avatar')[0].files[0];
        let reader = new FileReader();

        reader.addEventListener('load', function (event)
        {
            $('#avatar').attr("src", reader.result);
        }, false);

        if (file)
        {
            reader.readAsDataURL(file)
        }
    });

    $("#avatar").on('load', function() {
        $(this).cropper({
            aspectRatio: 1/1,
            viewMode: 1,
            dragMode: "move"
        });
    });

    $('#btn-submit').click(function(event) {
        event.preventDefault();
        $('#crop-picture').val($("#avatar").cropper('getCroppedCanvas').toDataURL('image/jpeg'));
        $('#form-profile-picture').submit();
    });

    $('#btn-cancel').click(function() {
        $('#profileModalPicture').modal('hide');
        setTimeout(function() {
            $('#profileModalPicture').remove();
        }, 1000);
    });
}

$(document).ready(function() {
    $('.mdb-select').materialSelect();
    $('.datepicker').pickadate({
        editable: true,
        firstDay: 1,
        min: [1900,0,1],
        max: true,
        monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre',
            'Novembre', 'Décembre'],
        monthsShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
        weekdaysFull: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        today: 'Aujourd\'hui',
        clear: 'Effacer',
        close: 'Fermer',
        format: 'dd/mm/yyyy',
        formatSubmit: 'dd/mm/yyyy'
    });

    $('#changeProfile').click(function() {
        var url = Routing.generate('profilePicture.'+$('html')[0].lang);
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                $('#profileEdit').before(data);
                initModalEvent();
                $('#profileModalPicture').modal('show');
            }
        });
    });

});
