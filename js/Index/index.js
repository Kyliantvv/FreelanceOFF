/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
import ReactDOM from "react-dom";
import App from '../Link/link';

require('../../scss/Index/index.scss');


// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = window.$ = window.jQuery = require('jquery');
require('mdbootstrap-pro/js/bootstrap.min');
import bsCustomFileInput from 'mdbootstrap-pro/js/modules/vendor/bs-custom-file-input';
global.bsCustomFileInput = bsCustomFileInput;
require('mdbootstrap-pro/js/mdb.min');
//var Translator = require('bazinga-translator');
import ('@fortawesome/fontawesome-pro/js/all');
import ('jquery-ui/ui/widgets/autocomplete');
const Routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';
import DocumentCv from '../Document/document';
import React from "react";
Routing.setRoutingData(Routes);


let linksModal = null;

function initExperienceModalEvent(id) {
    $('#experience_enterprise').autocomplete({
        source: function( request, response ) {
            var url = Routing.generate('enterprise-search.'+$('html')[0].lang, {"name": request.term});
            $.ajax({
                url: url,
                success: function( data ) {
                    response( data );
                }
            });
        },
        minLength: 2,
    });
    $('ul.ui-autocomplete').attr("tabindex", 9999).css('z-index', '9999');

    $('#experience_isCurrentExperience').change(function() {
        if (this.checked) {
            $('#experience_endYear').val(null);
            $('#experience_endMonth').val(null);
            $('#endDateSection').addClass('d-none');
        } else {
            $('#endDateSection').removeClass('d-none');
        }
    });

    $('#btn-delete').click(function() {
        var url = Routing.generate('experience-form-delete.'+$('html')[0].lang, {"experience": id});
        $.ajax({
            type: "DELETE",
            url: url,
            success: function (data) {
                location.reload();
            }
        });
        $('#modal-experience').modal('hide');
    });

    $("#modal-experience").on('hidden.bs.modal', function(){
        $('#modal-experience').remove();
    });

    $("#modal-experience").on('shown.bs.modal', function(){
        $('#modal-experience .mdb-select').materialSelect();
        if ($('#experience_isCurrentExperience').is(":checked")) {
            $('#endDateSection').addClass('d-none');
        }
    });

}

function initFormationModalEvent(id) {
    $('#formation_school').autocomplete({
        source: function( request, response ) {
            var url = Routing.generate('school-search.'+$('html')[0].lang, {"name": request.term});
            $.ajax({
                url: url,
                success: function( data ) {
                    response( data );
                }
            });
        },
        minLength: 2,
    });
    $('ul.ui-autocomplete').attr("tabindex", 9999).css('z-index', '9999');

    $('#btn-delete').click(function() {
        var url = Routing.generate('formation-form-delete.'+$('html')[0].lang, {"formation": id});
        $.ajax({
            type: "DELETE",
            url: url,
            success: function (data) {
                location.reload();
            }
        });
        $('#modal-formation').modal('hide');
    });

    $("#modal-formation").on('hidden.bs.modal', function(){
        $('#modal-formation').remove();
    });

    $("#modal-formation").on('shown.bs.modal', function(){
        $('#modal-formation .mdb-select').materialSelect();
    });
}

function initSkillModalEvent() {
    $('#skill_skillSection').autocomplete({
        source: function( request, response ) {
            var url = Routing.generate('skill-section-search.'+$('html')[0].lang, {"name": request.term});
            $.ajax({
                url: url,
                success: function( data ) {
                    response( data );
                }
            });
        },
        minLength: 2,
    });
    $('#skill_skillName').autocomplete({
        source: function( request, response ) {
            var url = Routing.generate('skill-search.'+$('html')[0].lang, {"name": request.term});
            $.ajax({
                url: url,
                success: function( data ) {
                    response( data );
                }
            });
        },
        minLength: 2,
    });
    $('ul.ui-autocomplete').attr("tabindex", 9999).css('z-index', '9999');

    $("#modal-skill").on('hidden.bs.modal', function(){
        $('#modal-skill').remove();
    });
}

$(document).ready(function() {

    new DocumentCv('[id^=document-edit-btn-]','#btn-create-document');

    $('[id^=experience-link-]').click(function() {
        var id = $(this).attr('id').split("-");
        if (id.length === 3) {
            id = id[2];
            var url = Routing.generate('experience-form-edit.'+$('html')[0].lang, {"experience": id});
            $.ajax({
                type: "GET",
                url: url,
                success: function (data) {
                    $('#experience-section').before(data);
                    initExperienceModalEvent(id);
                    $('#modal-experience').modal('show');
                }
            });
        }
    });

    $('[id^=formation-link-]').click(function() {
        var id = $(this).attr('id').split("-");
        if (id.length === 3) {
            id = id[2];
            var url = Routing.generate('formation-form-edit.'+$('html')[0].lang, {"formation": id});
            $.ajax({
                type: "GET",
                url: url,
                success: function (data) {
                    $('#formation-section').before(data);
                    initFormationModalEvent(id);
                    $('#modal-formation').modal('show');
                }
            });
        }
    });

    $('#btn-edit-link').click(function () {
        if (!linksModal) {
            linksModal = ReactDOM.render(<App />, document.getElementById('react'));
        } else {
            linksModal.handleClickOpen();
        }
    });

    $('#btn-create-experience').click(function() {
        const resumeXP = $('[id^=form-enterprise-curriculum-]');
        const resumeXPId = resumeXP && resumeXP.length > 0  ? resumeXP.attr('id').split("-")[3] : 0;
        var url = Routing.generate('experience-form.'+$('html')[0].lang, {'resume' : resumeXPId});
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                $('#experience-section').before(data);
                initExperienceModalEvent();
                $('#modal-experience').modal('show');
            }
        });
    });

    $('#btn-create-formation').click(function() {
        const resumeFormation = $('[id^=form-enterprise-curriculum-]');
        const resumeFormationId = resumeFormation && resumeFormation.length > 0  ? resumeFormation.attr('id').split("-")[3] : 0;
        var url = Routing.generate('formation-form.'+$('html')[0].lang, {'resume' : resumeFormationId});
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                $('#formation-section').before(data);
                initFormationModalEvent();
                $('#modal-formation').modal('show');
            }
        });
    });

    $('#btn-create-skill').click(function() {
        const resumeSkill = $('[id^=form-enterprise-curriculum-]');
        const resumeSkillId = resumeSkill && resumeSkill.length > 0  ? resumeSkill.attr('id').split("-")[3] : 0;
        var url = Routing.generate('skill-form.'+$('html')[0].lang, {'resume' : resumeSkillId});
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                $('#skill-section').before(data);
                initSkillModalEvent();
                $('#modal-skill').modal('show');
            }
        });
    });

    $('[id^=skill-delete-btn-]').click(function() {
        var id = $(this).attr('id').split("-");
        if (id.length === 4) {
            id = id[3];
            var url = Routing.generate('skill-form-delete.'+$('html')[0].lang, {"userSkill": id});
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    location.reload();
                }
            });
        }
    });

});
