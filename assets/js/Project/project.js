/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../../scss/Project/project.scss');


// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = window.$ = window.jQuery = require('jquery');
require('mdbootstrap-pro/js/bootstrap.min');
import bsCustomFileInput from 'mdbootstrap-pro/js/modules/vendor/bs-custom-file-input';
global.bsCustomFileInput = bsCustomFileInput;
import ('@fortawesome/fontawesome-pro/js/all');
require('mdbootstrap-pro/js/mdb.min');
const Routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';
import {initPR} from './profileResources';
Routing.setRoutingData(Routes);


function initProjectModalEvent(id) {
    $('#btn-project-delete').click(function () {
        var url = Routing.generate('project-form-delete.'+$('html')[0].lang, {"project": id});
        $.ajax({
            type: "DELETE",
            url: url,
            success: function (data) {
                location.reload();
            }
        });
        $('#modal-project').modal('hide');
    });

    $("#modal-project").on('hidden.bs.modal', function () {
        if(!$("#modal-project").data('bs.modal')._isShown) {
            $('#modal-project').remove();
        }
    });

    $("#modal-project").on('shown.bs.modal', function () {
        if(!$("#modal-project").data('bs.modal')._isShown) {
            return;
        }
        $('#modal-project .mdb-select').materialSelect();
        $('.datepicker').pickadate(
            {
                monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                monthsShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
                weekdaysFull: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                weekdaysShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
                // Buttons
                today: '',//masque
                clear: 'Effacer',
                close: 'Fermer',

                // Accessibility labels
                labelMonthNext: 'Suivant',
                labelMonthPrev: 'Précédent',
                labelMonthSelect: 'Choisir un mois',
                labelYearSelect: 'Choisir une année',

                // Formats
                format: 'dd/mm/yyyy',
               // formatSubmit: 'yyyy-mm-dd',
            }
        );
    });
    $('form[name="project"]').on('submit', function (e) {
        e.preventDefault();
        var maRoutingModifier = $(this).attr('action');
        $.ajax({
            type: "POST",
            url: maRoutingModifier,
            data: new FormData($(this)[0]),
            processData: false, contentType: false, cache: false,
            success: function (data) {
                $('#modal-project').modal('hide');
                if( typeof data === 'object' && 'redirect' in data){
                    window.location.reload();
                } else
                {
                    setTimeout(function () {
                        $('.mastercontent').before(data);
                        initProjectModalEvent(id);
                        $('#modal-project').modal('show');
                    }, 500);
                }
            },
            error: function (data) {

            }
        });
    });
}

function initProjectCreation(projectType){
    var url = Routing.generate('project-form.'+$('html')[0].lang, {"projectType": projectType});
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('.mastercontent').before(data);
            initProjectModalEvent();
            $('#modal-project').modal('show');
        }
    });
}

$(document).ready(function() {
    $('#btn-create-project').click(function() {
        initProjectCreation($(this)[0].dataset.projectType);
    });
    $('#btn-create-outsourcing').click(function() {
        initProjectCreation($(this)[0].dataset.projectType);
    });

    $('[id^=project-edit-btn-]').click(function() {
        var id = $(this).attr('id').split("-");
        if (id.length === 4) {
            id = id[3];
            loadProject(id);
        }
    });
});

function loadProject(idProject, drawResources = false){
    const closeMe = ()=>{   $('#modal-project').modal('hide');};
    var url = Routing.generate('project-form-edit.'+$('html')[0].lang, {"project": idProject});
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('.mastercontent').before(data);
            initProjectModalEvent(idProject);
            initPR(idProject, closeMe);
            $('#modal-project').modal('show');
            if(drawResources){
                displayResources();
            }
        }
    });
}

function displayResources(){
    $('#navResource').click();
}

function loadProjectResources(idProject){
    $('#modal-project').modal('hide');
    loadProject(idProject, true);
}

export {loadProject}
export {loadProjectResources}