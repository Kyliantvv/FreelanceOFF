/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
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
Routing.setRoutingData(Routes);




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

    $('#btn-create-skill').click(function() {
        const resumeSkill = $('[id^=skill-section-]');
        const resumeSkillId = resumeSkill && resumeSkill.length > 0  ? resumeSkill.attr('id').split("-")[2] : 0;
        var url = Routing.generate('skill-form.'+$('html')[0].lang, {'resume' : resumeSkillId});
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                resumeSkill.before(data);
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
