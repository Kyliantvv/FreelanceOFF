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

class DocumentCv {

    constructor(editElement, createElement) {
        let localInstance = this;
        $(createElement).click(function() {
            const resumeCv = $('[id^=form-enterprise-curriculum-]');
            const resumeCvId = resumeCv && resumeCv.length > 0  ? resumeCv.attr('id').split("-")[3] : 0;
            var url = Routing.generate('document-form.'+$('html')[0].lang, {'resume' : resumeCvId });
            $.ajax({
                type: "GET",
                url: url,
                success: (data) => {
                    $('#document-section').before(data);
                    localInstance.initDocumentModalEvent();
                    $('#modal-document').modal('show');
                }
            });
        });

        $(editElement).click(function() {
            var id = $(this).attr('id').split("-");
            if (id.length === 4) {
                id = id[3];
                var url = Routing.generate('document-form-edit.'+$('html')[0].lang, {"document": id});
                $.ajax({
                    type: "GET",
                    url: url,
                    success: function (data) {
                        $('#document-section').before(data);
                        localInstance.initDocumentModalEvent(id);
                        $('#modal-document').modal('show');
                    }
                });
            }
        });
    }
    initDocumentModalEvent(id) {
        let localInstance = this;
        $('#btn-document-delete').click(function () {
            var url = Routing.generate('document-form-delete.' + $('html')[0].lang, {"document": id});
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    location.reload();
                }
            });
            $('#modal-document').modal('hide');
        });

        $("#modal-document").on('hidden.bs.modal', function () {
            $('#modal-document').remove();
        });

        $("#modal-document").on('shown.bs.modal', function () {
            $('#modal-document .mdb-select').materialSelect();
            var data = $('#document_commentaireCle').val().split(',')
                .map(function (tag) {
                    return {tag: tag}
                });
            var element = $('.chips-commentaire-cle');
            element.materialChip({
                placeholder: Translator.trans('document.form.tag.done'),
                secondaryPlaceholder: Translator.trans('document.form.tag.done'),
                data: data
            });

            element.on('chip.add', function (e, chip) {

                localInstance.updateChipInput(this);
            });
            element.on('chip.delete', function (e, chip) {
                localInstance.updateChipInput(this);
            });
            element.on("click", ".fa-times", function () {
                $(this).parent().remove();
                localInstance.updateChipInput(this);
            });
        });
        $('form[name="document"]').on('submit', function (e) {
            e.preventDefault();
            var maRoutingModifier = $(this).attr('action');
            $.ajax({
                type: "POST",
                url: maRoutingModifier,
                data: new FormData($(this)[0]),
                processData: false, contentType: false, cache: false,
                success: function (data) {
                    $('#modal-document').modal('hide');
                    if (typeof data === 'object' && 'redirect' in data) {
                        window.location.reload();
                    } else {
                        setTimeout(function () {
                            $('#document-section').before(data);
                            localInstance.initDocumentModalEvent();
                            $('#modal-document').modal('show');
                        }, 500);
                    }
                },
                error: function (data) {

                }
            });
        });
    }

    updateChipInput(chip){
        var newval= $('.chips-commentaire-cle').materialChip('data')[0].innerText;
        if(newval){
            newval = newval.replace(/\n/g, ',');
        }
        $('#document_commentaireCle').val(newval);
    }
}


export default DocumentCv;
