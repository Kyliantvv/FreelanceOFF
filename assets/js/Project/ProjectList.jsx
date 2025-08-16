import React, { Component } from 'react';

const Translator = require('bazinga-translator');
const Routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';
import '../../scss/Enterprise/enterpriseCurriculum.scss';
import ProjectItems from '../Components/Project/ProjectItems/projectItems';
import ReactDOM from "react-dom";
import {initPR} from "./profileResources";
import Aux from "../hoc/Auxiliary/Auxiliary";
import BarButton from "../Components/Project/BarButton/BarButton";
import NavButton from '../Components/Project/NavigationButton/navigationButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import FilterButton from "../Components/Project/FilterButton/FilterButton";

Routing.setRoutingData(Routes);


class ProjectList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            itemsCount: 0 ,
            page: 1,
            limit: 5,
            loading:false,
            filter: {'projectType':  ''}
        };
    }

    previousData = () => {
        this.loadData(this.state.limit,this.state.page-1);
    };
    nextData = () => {
       this.loadData(this.state.limit,this.state.page+1);
    };
    FirstData = () => {
        this.loadData(this.state.limit,1);
    };
    LastData = () => {
        this.loadData(this.state.limit,Math.ceil(this.state.itemsCount / this.state.limit));
    };

    componentDidMount() {
        this.loadData(this.state.limit,this.state.page);
    }

    createProject = (type) =>{
        this.initProjectCreation(type);
    };
    loadData(limit, page, filter = null){
        this.setState({isLoaded: false});
        let url = Routing.generate('api_target_project_search')+ "?";
        url += 'limit=' + limit;
        url += '&page=' + page;
        filter = filter ? filter : this.state.filter;
        if(filter) {
            Object.keys(filter).map((element) => {
                if (element && filter[element]) {
                    url += "&" + element + "=" + filter[element];
                }
            });
        }
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data,
                        itemsCount: result.itemsCount,
                        page: result.page,
                        filter: filter
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    initProjectCreation = (projectType) => {
        var url = Routing.generate('project-form.'+document.documentElement.lang, {"projectType": projectType});
        $.ajax({
            type: "GET",
            url: url,
            success:  (data) => {
                $('.mastercontent').before(data);
                this.initProjectModalEvent();
                $('#modal-project').modal('show');
            }
        });
    };

    loadProject = (idProject, drawResources = false) => {
        const closeMe = ()=>{   $('#modal-project').modal('hide');};
        var url = Routing.generate('project-form-edit.'+document.documentElement.lang, {"project": idProject});

        $.ajax({
            type: "GET",
            url: url,
            success: (data) => {
                $('.mastercontent').before(data);
                this.initProjectModalEvent(idProject);
                initPR(idProject, closeMe, this.openMe);
                $('#modal-project').modal('show');
                if(drawResources){
                    $('#navResource').click()
                }
            }
        });
    };


    openMe = (idProject) => {
        $('#modal-project').modal('hide');
        this.loadProject(idProject, true);
    };

    initProjectModalEvent( id ) {
        const myModal =   $("#modal-project");
        $('#btn-project-delete').off().on('click', event => {
                var url = Routing.generate('project-form-delete.'+document.documentElement.lang, {"project": id});
                $.ajax({
                    type: "DELETE",
                    url: url,
                    success:  (data) => {
                        this.loadData();
                    }
                });
            myModal.modal('hide');
            });

        myModal.on('hidden.bs.modal',  () => {
                if(!myModal.data('bs.modal')._isShown) {
                    myModal.remove();
                }
            });

        myModal.on('shown.bs.modal', function () {
                if(!myModal.data('bs.modal')._isShown) {
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
        const myForm = $('form[name="project"]');
        myForm.off().on('submit',  (e) => {
                e.preventDefault();
                var maRoutingModifier = $(myForm).attr('action');
                $.ajax({
                    type: "POST",
                    url: maRoutingModifier,
                    data: new FormData($(myForm)[0]),
                    processData: false, contentType: false, cache: false,
                    success:  (data) => {
                        myModal.modal('hide');
                        if( typeof data === 'object' && 'redirect' in data){
                            window.location.reload();
                        } else
                        {
                            setTimeout( () => {
                                $('.mastercontent').before(data);
                                this.initProjectModalEvent(id);
                                myModal.modal('show');
                            }, 500);
                        }
                    },
                    error: function (data) {

                    }
                });
            });
    };

    filterHandler = (value) => {
        let filter = {'projectType':  ''};
        if(value ){
            filter = {'projectType':  value};
        }
        this.loadData(this.state.limit,1, filter);
    };

    render () {
        const projectBodyList = this.state.isLoaded ?
            <ProjectItems items={this.state.items} projectEdit={this.loadProject}/>
            : <CircularProgress color="secondary"/>;

        return (
            <Aux>
                <BarButton
                    project={
                        {
                            classes: 'btn-floating btn-primary btn-lg d-flex align-items-center justify-content-center my-0',
                            title: Translator.trans('index.btn.createProject'),
                            icon: 'fas fa-business-time',
                            click: () => this.createProject(1)
                        }
                    }
                    outsourcing={
                        {
                            classes: 'btn-floating btn-primary btn-lg d-flex align-items-center justify-content-center my-0',
                            title: Translator.trans('index.btn.createOutsourcing'),
                            icon: 'fas fa-chart-network',
                            click: () => this.createProject(2)
                        }
                    }/>
                 <FilterButton callbackRb={this.filterHandler}/>
                {projectBodyList}
                <NavButton
                    previous={this.state.page > 1} next={this.state.page * this.state.limit < this.state.itemsCount}
                    navPrevious={this.previousData} navNext={this.nextData} navFirst={this.FirstData} navLast={this.LastData}
                    current={Translator.trans('widget.navigation.current', {start: ((this.state.page - 1)*this.state.limit)+1, end: Math.min(this.state.page*this.state.limit, this.state.itemsCount), total:this.state.itemsCount})}
                />
            </Aux>
        )
    }
}

ReactDOM.render(<ProjectList />, document.getElementById('projectListWidget'));

let loadProjectJsxResources;
export default {ProjectList};