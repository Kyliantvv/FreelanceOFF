import React from "react";
const Translator = require('bazinga-translator');
import Aux from "../../../../hoc/Auxiliary/Auxiliary";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectDocuments from "./projectDocuments";
import ItemButton from './Button/itemButton';

const projectItem = (props) => {
    const edit  = Translator.trans('btn.edit');
    const seeDoc = Translator.trans('btn.seeDoc');
    const [expanded, setExpanded] = React.useState();
    const [documents, setDocuments] = React.useState(props.documentProjects);

    const handleChange = (panel) => (event, newExpanded) => {
        if(!documents.length > 0){
            event.preventDefault();
            return;
        }
        setExpanded(newExpanded ? panel : false);
    };



    let listDoc = null;
    let iconSeeDoc = null;
    if(documents.length > 0){
        listDoc = (
                <ExpansionPanelDetails>
                    <ProjectDocuments documentsProject={documents} idProj={props.id} deleteOneDoc={props.deleteDocument}/>
                </ExpansionPanelDetails>
            );
        iconSeeDoc = <ItemButton class="btn-floating btn-elegant btn-sm d-flex align-items-center justify-content-center my-0 " title={seeDoc} iconClass="fas fa-eye text-white" />;

    }
    return (
    <Aux>
        <ExpansionPanel square expanded={expanded === 'panelProject-'+props.id} onChange={ handleChange('panelProject-'+props.id)}>
            <ExpansionPanelSummary aria-controls={"panelProject-content-"+props.id} id={"panelProject-header-"+props.id}
                expandIcon={documents.length > 0 ? iconSeeDoc : null}
            >

                <div className="col-12 text-left">
                    <div className="text-decoration-none text-black" id="project-link-{{ project.id }}">
                        <div className="row">
                            <div className="col-1">
                                {props.projectType === '1' ?
                                    <i className="far fa-business-time fa-2x" title={Translator.trans('project.form.projectType.choices.'+props.projectType)}/>
                                    :
                                    <i className="far fa-chart-network fa-2x" title={Translator.trans('project.form.projectType.choices.'+props.projectType)}/>
                                }
                            </div>
                            <div className="col-11">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>
                                        {props.projectType === '1' ?
                                            props.projectName
                                            :
                                            Translator.trans('project.list.outsourcing', {
                                                    'debut': new Intl.DateTimeFormat(
                                                        document.documentElement.lang,
                                                        {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit"
                                                        }
                                                    ).format(props.startDate)
                                                    , 'duree': Translator.trans('project.form.duration.choices.' + props.duration)
                                                }
                                            )
                                        }
                                            <span>
                                                <span className="btn-floating btn-warning btn-sm d-flex align-items-center justify-content-center my-0 float-right"
                                                      id={"project-edit-btn-" + props.id} title={edit} onClick={(event) =>{event.preventDefault(); props.projectEdit()}}>
                                                    <i className="fas fa-pencil text-white"/>
                                                </span>
                                            </span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ExpansionPanelSummary>
            {listDoc}
        </ExpansionPanel>
    </Aux>
    );
};

export default projectItem;