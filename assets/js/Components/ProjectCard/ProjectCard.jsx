import React from 'react';
import PropTypes from 'prop-types';

const Translator = require('bazinga-translator');
const Routes = require('../../../../public/js/fos_js_routes.json');
import Routing from '../../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';

require('../../../scss/base.scss');

Routing.setRoutingData(Routes);

const projectCard =  (props) => {

    function renderCivility(enterprise) {
        switch (enterprise.civility) {
            case '1':
                return Translator.trans('widget.project.civility.1') + " " + enterprise.contactUsualName + " " + enterprise.contactUsualFirstName;
            default:
                return Translator.trans('widget.project.civility.2') + " " + enterprise.contactUsualName + " " + enterprise.contactUsualFirstName;
        }
        return null;
    }

    function renderDuration() {
        switch (props.duration) {
            case '1':
                return Translator.trans('widget.project.grid.duration.1');
            case '2':
                return Translator.trans('widget.project.grid.duration.2');
            case '3':
                return Translator.trans('widget.project.grid.duration.3');
            case '4':
                return Translator.trans('widget.project.grid.duration.4');
        }
        return null;
    }

    return (
        <div className="col-4 my-4">
            <div className="card testimonial-card">
                <div className="card-up indigo lighten-1"></div>
                {/*Avatar*/}
                {
                    props.avatar ?
                        <div className="avatar mx-auto white">
                            <img src={ props.avatar } className="rounded-circle"
                                 alt={ props.enterprise ? props.enterprise.name : null }/>
                        </div>
                        :
                        <div className="avatar mx-auto white">
                                <span className="d-flex align-items-center justify-content-center text-primary">
                                    <i className="fas fa-user-tie fa-7x"></i>
                                </span>
                        </div>
                }
                <div className="card-body">
                    <div className="row">
                        {
                            props.projectName ?
                                <div className="col-12">
                                    <h3 className="card-title">{ props.projectName }</h3>
                                </div>
                                :
                                null
                        }
                        {
                            props.description ?
                                <div className="col-12">
                                    <p><i className="fas fa-quote-left"></i> {props.description}</p>
                                </div>
                                :
                                null
                        }
                        <div className="col-12">
                            <hr/>
                        </div>
                        {
                            props.enterprise ?
                                <div className="col-12">
                                    <p>{props.enterprise.name}</p>
                                    {
                                        props.enterprise.contactUsualFirstName ?
                                            <p>{renderCivility(props.enterprise)}</p>
                                            :
                                            null
                                    }
                                </div>
                                :
                                null
                        }
                        {
                            props.location ?
                                <div className="col-6">
                                    <h4>
                                        <i className="fas fa-map-marked mr-2"></i>
                                        <small>
                                            <span>{props.location}</span>
                                        </small>
                                    </h4>
                                </div>
                                :
                                null
                        }
                        {
                            props.email ?
                                <div className="col-6">
                                    <h4>
                                        <i className="fas fa-envelope mr-2"></i>
                                        <small>
                                            <a href={ "mailto:" + props.email }>{props.email}</a>
                                        </small>
                                    </h4>
                                </div>
                                :
                                null
                        }
                        {
                            props.duration ?
                                <div className="col-6">
                                    <h4>
                                        <i className="fas fa-alarm-clock mr-2"></i>
                                        <small>
                                            <span>{renderDuration()}</span>
                                        </small>
                                    </h4>
                                </div>
                                :
                                null
                        }
                        <div className="col-12">
                            <a href={ Routing.generate('project_information_card.'+document.documentElement.lang, {'project': props.idProject}) }
                               className="btn-floating btn-primary d-flex align-items-center justify-content-center mx-auto my-0">
                                <i className="fas fa-info text-white"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

projectCard.propTypes = {
    avatar: PropTypes.string,
    projectName: PropTypes.string,
    projectType: PropTypes.string,
    startDate: PropTypes.object,
    duration: PropTypes.string,
    description: PropTypes.string,
    comment: PropTypes.string,
    email: PropTypes.string,
    enterprise: PropTypes.object,
    location: PropTypes.string,
    status: PropTypes.string,
    idProject: PropTypes.number
};

export default projectCard;