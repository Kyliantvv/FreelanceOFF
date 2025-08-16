import React  from 'react';
import PropTypes from 'prop-types';

const Translator = require('bazinga-translator');
const Routes = require('../../../../public/js/fos_js_routes.json');
import Routing from '../../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';

require('../../../scss/base.scss');

Routing.setRoutingData(Routes);

const resumeCard =  (props) => {
    function renderIdentity() {
        switch (props.civility) {
            case '1':
                return Translator.trans('widget.freelance.civility.1') + " " + props.lastName + " " + props.firstName;
            case '2':
                return Translator.trans('widget.freelance.civility.2') + " " + props.lastName + " " + props.firstName;
            default:
                return props.lastName + " " + props.firstName;
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
                                 alt={ renderIdentity() }/>
                        </div>
                        :
                        <div className="avatar mx-auto white">
                                <span className="d-flex align-items-center justify-content-center text-primary">
                                    <i className="fas fa-user fa-7x"></i>
                                </span>
                        </div>
                }
                <div className="card-body">
                    {/*Name*/}
                    <div className="row">
                        <div className="col-12">
                            <h3 className="card-title">{ renderIdentity() }</h3>
                        </div>
                        {
                            props.jobSection ?
                                <div className="col-12">
                                    <span className="mb-0">{props.jobSection}</span>
                                </div>
                                :
                                null
                        }
                    </div>
                    <hr className="mt-1"/>
                    {/*Description*/}
                    {
                        props.description ?
                            <div className="col-12">
                                <p><i className="fas fa-quote-left"></i> {props.description}</p>
                                <hr/>
                            </div>
                            :
                            null

                    }
                    {/*Address*/}
                    <div className="col-12">
                        <h4>
                            {
                                props.city || props.country || props.address ?
                                    <span><i className="fas fa-map-marker-alt mr-2"></i><small>{props.address ? props.address : null} {props.city ? props.city : null} {props.country ? props.country : null}</small></span>
                                    :
                                    null
                            }
                        </h4>
                    </div>
                    {/*Birthdate and mail*/}
                    <div className="col-12">
                        <div className="row">
                            {
                                props.birthday ?
                                    <div className="col-6">
                                        <h4>
                                            <i className="fas fa-birthday-cake mr-2"></i>
                                            <small>{ new Intl.DateTimeFormat(document.documentElement.lang, {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit"
                                            }).format(props.birthday) }</small>
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
                        </div>
                    </div>
                    {/*Phone*/}
                    <div className="col-12">
                        <div className="row">
                            {
                                props.mobilePhone ?
                                    <div className="col-6">
                                        <h4>
                                            <i className="fas fa-mobile-alt mr-2"></i>
                                            <small>
                                                <a href={ "tel:" + props.mobilePhone }>{props.mobilePhone}</a>
                                            </small>
                                        </h4>
                                    </div>
                                    :
                                    null
                            }
                            {
                                props.phone ?
                                    <div className="col-6">
                                        <h4>
                                            <i className="fas fa-phone mr-2"></i>
                                            <small>
                                                <a href={ "tel:" + props.phone }>{props.phone}</a>
                                            </small>
                                        </h4>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className="col-12">
                        <a href={ Routing.generate('user_profile.'+document.documentElement.lang, {'resume': props.idResume}) }
                           className="btn-floating btn-primary d-flex align-items-center justify-content-center mx-auto my-0">
                            <i className="fas fa-info text-white"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

};

resumeCard.propTypes = {
    avatar: PropTypes.string,
    civility: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    mobilePhone: PropTypes.string,
    zipCode: PropTypes.string,
    address: PropTypes.string,
    country: PropTypes.string,
    birthday: PropTypes.object,
    jobSection: PropTypes.string,
    description: PropTypes.string,
    idResume: PropTypes.number
};

export default resumeCard;