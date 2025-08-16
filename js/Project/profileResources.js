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
import ProjectList from './ProjectList';

let openProject = null;
function initProfileResourcesModalEvent(idProject, idResource) {
    $('#btn-profileResources-delete').click(function () {
        var url = Routing.generate('profileResources-form-delete.'+$('html')[0].lang, {"profileResources": idResource});
        $.ajax({
            type: "DELETE",
            url: url,
            success: function (data) {
                location.reload();
            }
        });
        $('#modal-profileResources').modal('hide');
    });

    $("#modal-profileResources").on('hidden.bs.modal', function () {
        if(!$("#modal-profileResources").data('bs.modal')._isShown) {
            $('#modal-profileResources').remove();
        }
    });
    $("#modal-profileResources").on('hide.bs.modal', function () {
        if($("#modal-profileResources").data('bs.modal')._isShown) {
            if(openProject) {
                openProject(idProject);
            }
        }
    });

    $("#modal-profileResources").on('shown.bs.modal', function () {
        if($("#modal-profileResources").data('bs.modal')._isShown) {
            $('#modal-profileResources .mdb-select').materialSelect();
        }
    });
    $('form[name="profile_resources"]').on('submit', function (e) {
        e.preventDefault();
        var maRoutingModifier = $(this).attr('action');
        $.ajax({
            type: "POST",
            url: maRoutingModifier,
            data: new FormData($(this)[0]),
            processData: false, contentType: false, cache: false,
            success: function (data) {
                $('#modal-profileResources').modal('hide');
            },
            error: function (data) {

            }
        });
    });
}

function initProfileResourcesCreation(idProject){
    var url = Routing.generate('profileResources-form.'+$('html')[0].lang, {'project' : idProject});
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            $('.mastercontent').before(data);
            initProfileResourcesModalEvent(idProject, null);
            $('#modal-profileResources').modal('show');
        }
    });
}

function initProfileResources(idProject, callFunc = null, openBack = null){
    openProject = openBack;
    $('#btn-create-profileResources').off().click(function() {
        if(callFunc){
            callFunc();
        }
        initProfileResourcesCreation(idProject);
    });

    $('[id^=profileResources-edit-btn-]').off().click(function() {
        if(callFunc){
            callFunc();
        }
        var id = $(this).attr('id').split("-");
        if (id.length === 4) {
            id = id[3];
            var url = Routing.generate('profileResources-form-edit.'+$('html')[0].lang, {"profileResources": id});
            $.ajax({
                type: "GET",
                url: url,
                success: function (data) {
                    $('.mastercontent').before(data);
                    initProfileResourcesModalEvent(idProject, id);
                    $('#modal-profileResources').modal('show');
                }
            });
        }
    });
}

export {initProfileResources as initPR}