import React from "react";
const Routes = require('../../../../../../../public/js/fos_js_routes.json');
import Routing from '../../../../../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';

const documentButtonShow = (props) => {
    return (
        <button className="btn btn-rounded btn-outline-dark waves-effect" title={props.documentName}>
            <a className="text-dark" href={Routing.generate('project-form-show.' + document.documentElement.lang, {'documentProject': props.id})}>
                <i className="fas fa-file "/>
                <span className="pl-2">{props.documentName}</span>
            </a>
        </button>
    )
};

export default documentButtonShow;