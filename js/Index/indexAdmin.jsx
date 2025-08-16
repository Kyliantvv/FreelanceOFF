import React, { Component } from 'react';
import { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import LeakAdd from '@material-ui/icons/LeakAdd';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Visibility from "@material-ui/icons/Visibility";
import Cached from '@material-ui/icons/Cached';
import Archive from '@material-ui/icons/Archive';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import BusinessIcon from '@material-ui/icons/Business';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Translator = require('bazinga-translator');
const Routes = require('../../../public/js/fos_js_routes.json');
import Routing from '../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router';

import '../../scss/Index/indexAdmin.scss';
import {Add} from "@material-ui/icons";
import ModalUI from "../UI/Modal/ModalUi";
import IntegreUser from "../User/integreUser";

Routing.setRoutingData(Routes);

class App extends Component {

    returnCivility(value) {
        switch (value) {
            case '1':
                return Translator.trans('widget.freelance.civility.1');
            default:
                return Translator.trans('widget.freelance.civility.2');
        }
    }

    renderFreelanceInformation(rowData) {
        if (rowData.phone) {
            return <span><span>{Translator.trans('widget.freelance.grid.info.phone')}: <a href='tel:{rowData.phone}'>{rowData.phone}</a></span>{rowData.mobilePhone ? (<span className='ml-1'>{Translator.trans('widget.freelance.grid.info.mobilePhone')}: <a href='tel:{rowData.mobilePhone}'>{rowData.mobilePhone}</a></span>) : null}{rowData.email ? <span className='ml-1'>{Translator.trans('widget.freelance.grid.info.email')}: <a href='mailto:{rowData.email}'>{rowData.email}</a></span> : null}</span>;
        } else if (rowData.mobilePhone) {
            return <span><span>{Translator.trans('widget.freelance.grid.info.mobilePhone')}: <a href='tel:{rowData.mobilePhone}'>{rowData.mobilePhone}</a></span>{rowData.email ? <span className='ml-1'>{Translator.trans('widget.freelance.grid.info.email')}: <a href='mailto:{rowData.email}'>{rowData.email}</a></span> : null}</span>;
        } else if (rowData.email) {
            return <span>{Translator.trans('widget.freelance.grid.info.email')}: <a href='mailto:{rowData.email}'>{rowData.email}</a></span>
        }
        return null;
    }

    renderFreelanceAddress(rowData) {
        let info = null;
        if (rowData.address) {
            info = <span>{rowData.address} {rowData.zipCode ? ("- " + rowData.zipCode) : null} {rowData.city ? ("- " + rowData.city) : null}</span>;
        } else if (rowData.zipCode) {
            info = <span>{rowData.zipCode ? ("- " + rowData.zipCode) : null} {rowData.city ? ("- " + rowData.city) : null}</span>;
        }
        return info;
    }

    renderProjectInformation(rowData) {
        if (rowData.phone) {
            return <span><span>{Translator.trans('widget.project.grid.info.phone')}: <a href='tel:{rowData.phone}'>{rowData.phone}</a></span>{rowData.mobilePhone ? (<span className='ml-1'>{Translator.trans('widget.project.grid.info.mobilePhone')}: <a href='tel:{rowData.mobilePhone}'>{rowData.mobilePhone}</a></span>) : null}{rowData.email ? <span className='ml-1'>{Translator.trans('widget.project.grid.info.email')}: <a href='mailto:{rowData.email}'>{rowData.email}</a></span> : null}</span>;
        } else if (rowData.mobilePhone) {
            return <span><span>{Translator.trans('widget.project.grid.info.mobilePhone')}: <a href='tel:{rowData.mobilePhone}'>{rowData.mobilePhone}</a></span>{rowData.email ? <span className='ml-1'>{Translator.trans('widget.project.grid.info.email')}: <a href='mailto:{rowData.email}'>{rowData.email}</a></span> : null}</span>;
        } else if (rowData.email) {
            return <span>{Translator.trans('widget.project.grid.info.email')}: <a href='mailto:{rowData.email}'>{rowData.email}</a></span>
        }
        return null;
    }

    inProgressFreelanceHandler(rowData) {
        const inProgressFreelanceRoute = Routing.generate('api_in_progress_resume', {'idResume': rowData.idResume});
        fetch(inProgressFreelanceRoute, {method: 'PUT'})
            .then(result => {
                this.state.tableFreelanceRef.current && this.state.tableFreelanceRef.current.onQueryChange();
                return result;
            });
    }

    treatedFreelanceHandler(rowData) {
        const treatedFreelanceRoute = Routing.generate('api_treated_resume', {'idResume': rowData.idResume});
        fetch(treatedFreelanceRoute, {method: 'PUT'})
            .then(result => {
                this.state.tableFreelanceRef.current && this.state.tableFreelanceRef.current.onQueryChange();
                return result;
            });
    }

    archivedFreelanceHandler(rowData) {
        const archivedFreelanceRoute = Routing.generate('api_archived_resume', {'idResume': rowData.idResume});
        fetch(archivedFreelanceRoute, {method: 'PUT'})
            .then(result => {
                this.state.tableFreelanceRef.current && this.state.tableFreelanceRef.current.onQueryChange();
                return result;
            });
    }

    deleteFreelanceHandler(rowData) {
        const deleteFreelanceRoute = Routing.generate('api_resume_delete', {'idResume': rowData.idResume});
        fetch(deleteFreelanceRoute, {method: 'DELETE'})
            .then(result => {
                this.state.tableFreelanceRef.current && this.state.tableFreelanceRef.current.onQueryChange();
                return result;
            });
    }

    omFreelanceHandler(rowData) {
        const omFreelanceRoute = Routing.generate('api_resume_to_om', {'idResume': rowData.idResume});
        fetch(omFreelanceRoute, {method: 'PUT'})
            .then(result => {
                this.state.tableFreelanceRef.current && this.state.tableFreelanceRef.current.onQueryChange();
                return result;
            });
    }

    inProgressProjectHandler(rowData) {
        const inProgressProjectRoute = Routing.generate('api_in_progress_project', {'idProject': rowData.id});
        fetch(inProgressProjectRoute, {method: 'PUT'})
            .then(result => {
                this.state.tableProjectRef.current && this.state.tableProjectRef.current.onQueryChange();
                return result;
            });
    }

    treatedProjectHandler(rowData) {
        const treatedProjectRoute = Routing.generate('api_treated_project', {'idProject': rowData.id});
        fetch(treatedProjectRoute, {method: 'PUT'})
            .then(result => {
                this.state.tableProjectRef.current && this.state.tableProjectRef.current.onQueryChange();
                return result;
            });
    }

    archivedProjectHandler(rowData) {
        const archivedProjectRoute = Routing.generate('api_archived_project', {'idProject': rowData.id});
        fetch(archivedProjectRoute, {method: 'PUT'})
            .then(result => {
                this.state.tableProjectRef.current && this.state.tableProjectRef.current.onQueryChange();
                return result;
            });
    }

    deleteProjectHandler(rowData) {
        const deleteProjectRoute = Routing.generate('api_project_delete', {'idProject': rowData.id});
        fetch(deleteProjectRoute, {method: 'DELETE'})
            .then(result => {
                this.state.tableProjectRef.current && this.state.tableProjectRef.current.onQueryChange();
                return result;
            });
    }

    transformDate(user) {
        const isoFormatDate = /([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])[+-](\d{4})|((\d{2})\:(\d{2}))/;
        if (user == null || !isoFormatDate.test(user.dateCreationAccount)) {
            return null;
        }
        const date = user.dateCreationAccount.replace(/\D/g, " ");
        const dtcomps = date.split(" ");
        dtcomps[1]--;
        const dateObject = new Date(Date.UTC(dtcomps[0], dtcomps[1], dtcomps[2], dtcomps[3], dtcomps[4], dtcomps[5]));
        if (dateObject) {
            return (""+dateObject.getDate()).padStart(2, '0') + "/" + (""+(dateObject.getMonth()+1)).padStart(2, '0') + "/" + dateObject.getFullYear();
        }
        return "";
    }

    constructor(props) {
        super(props);
        this.state = {
            showImportFreelance : false,
            tableFreelanceRef: React.createRef(),
            tableProjectRef: React.createRef(),
            columnFreelanceDefs: [
                {
                    title: Translator.trans('widget.freelance.grid.civility'),
                    field: 'civility',
                    render: rowData => <span>{this.returnCivility(rowData.civility)} {rowData.lastName} {rowData.firstName} <br/>{this.transformDate(rowData.idUser)}</span>
                },
                {
                    title: Translator.trans('widget.freelance.grid.info.title'),
                    field: 'information',
                    filtering: false,
                    sorting: false,
                    render: rowData => this.renderFreelanceInformation(rowData)
                },
                {
                    title: Translator.trans('widget.freelance.grid.address'),
                    field: 'address',
                    filtering: false,
                    sorting: false,
                    render: rowData => this.renderFreelanceAddress(rowData)
                },
                {
                    title: Translator.trans('widget.freelance.grid.workerStatusType.title'),
                    field: 'workerStatusType',
                    lookup: {
                        "1": Translator.trans('widget.freelance.grid.workerStatusType.1'),
                        "2": Translator.trans('widget.freelance.grid.workerStatusType.2'),
                        "3": Translator.trans('widget.freelance.grid.workerStatusType.3'),
                        "9": Translator.trans('widget.freelance.grid.workerStatusType.9'),
                    }
                },
                {
                    title: Translator.trans('widget.freelance.grid.status.title'),
                    field: 'status',
                    lookup: {
                        "1": Translator.trans('widget.freelance.grid.status.1'),
                        "2": Translator.trans('widget.freelance.grid.status.2'),
                        "3": Translator.trans('widget.freelance.grid.status.3'),
                        "4": Translator.trans('widget.freelance.grid.status.4'),
                        "5": Translator.trans('widget.freelance.grid.status.5')
                    }
                },
            ],
            actionFreelanceDefs: [
                {
                    icon: Visibility,
                    tooltip: Translator.trans('widget.freelance.grid.action.profile'),
                    onClick: (event, rowData) => window.location = Routing.generate('user_profile.' + document.documentElement.lang, {'resume': rowData.idResume})
                },
                rowData => (rowData.status !== '2' ? {
                    icon: Cached,
                    tooltip: Translator.trans('widget.freelance.grid.action.inProgress'),
                    onClick: (event, rowData) => this.inProgressFreelanceHandler(rowData)
                } : null),
                rowData => (rowData.status !== '3' ? {
                    icon: Check,
                    tooltip: Translator.trans('widget.freelance.grid.action.treated'),
                    onClick: (event, rowData) => this.treatedFreelanceHandler(rowData)
                } : null),
                rowData => (rowData.status !== '4' ? {
                    icon: Archive,
                    tooltip: Translator.trans('widget.freelance.grid.action.archived'),
                    onClick: (event, rowData) => this.archivedFreelanceHandler(rowData)
                } : null),
                rowData => (rowData.status !== '5' ? {
                    icon: DeleteOutline,
                    tooltip: Translator.trans('widget.freelance.grid.action.delete'),
                    onClick: (event, rowData) => this.deleteFreelanceHandler(rowData)
                } : null),
                rowData => (!rowData.idOpportunity && rowData.idUser ? {
                        icon: LeakAdd,
                        tooltip: Translator.trans('widget.freelance.grid.action.om'),
                        onClick: (event, rowData) => this.omFreelanceHandler(rowData)
                } : null),
                {
                    icon: Search,
                    tooltip: Translator.trans('widget.btn.search'),
                    isFreeAction: true,
                    onClick: () => this.state.tableFreelanceRef.current && this.state.tableFreelanceRef.current.onQueryChange(),
                },
                {
                    icon: Add,
                    tooltip: Translator.trans('widget.btn.import'),
                    isFreeAction: true,
                    onClick: () => this.setState({'showImportFreelance' : true}),
                }
            ],

            columnProjectDefs: [
                {
                    title: Translator.trans('widget.project.grid.enterprise'),
                    field: 'enterprise',
                    render: rowData => <span>{ rowData.idEnterprise ? rowData.idEnterprise.name : null}</span>
                },
                {
                    title: Translator.trans('widget.project.grid.projectName'),
                    field: 'projectName',
                },
                {
                    title: Translator.trans('widget.project.grid.contact'),
                    field: 'information',
                    filtering: false,
                    sorting: false,
                    render: rowData => this.renderProjectInformation(rowData)
                },
                {
                    title: Translator.trans('widget.project.grid.startDate'),
                    field: 'startDate',
                    type: 'date'
                },
                {
                    title: Translator.trans('widget.project.grid.duration.title'),
                    field: 'duration',
                    lookup: {
                        "1": Translator.trans('widget.project.grid.duration.1'),
                        "2": Translator.trans('widget.project.grid.duration.2'),
                        "3": Translator.trans('widget.project.grid.duration.3'),
                        "4": Translator.trans('widget.project.grid.duration.4'),
                    }
                },
                {
                    title: Translator.trans('widget.project.grid.status.title'),
                    field: 'status',
                    lookup: {
                        "1": Translator.trans('widget.project.grid.status.1'),
                        "2": Translator.trans('widget.project.grid.status.2'),
                        "3": Translator.trans('widget.project.grid.status.3'),
                        "4": Translator.trans('widget.project.grid.status.4'),
                        "5": Translator.trans('widget.project.grid.status.5')
                    }
                },
            ],
            actionProjectDefs: [
                {
                    icon: Visibility,
                    tooltip: Translator.trans('widget.project.grid.action.project'),
                    onClick: (event, rowData) => window.location = Routing.generate('project_information_card.' + document.documentElement.lang, {'project': rowData.id})
                },
                rowData => (rowData.status !== '2' ? {
                    icon: Cached,
                    tooltip: Translator.trans('widget.project.grid.action.inProgress'),
                    onClick: (event, rowData) => this.inProgressProjectHandler(rowData)
                } : null),
                rowData => (rowData.status !== '3' ? {
                    icon: Check,
                    tooltip: Translator.trans('widget.project.grid.action.treated'),
                    onClick: (event, rowData) => this.treatedProjectHandler(rowData)
                } : null),
                rowData => (rowData.status !== '4' ? {
                    icon: Archive,
                    tooltip: Translator.trans('widget.project.grid.action.archived'),
                    onClick: (event, rowData) => this.archivedProjectHandler(rowData)
                } : null),
                rowData => (rowData.status !== '5' ? {
                    icon: DeleteOutline,
                    tooltip: Translator.trans('widget.project.grid.action.delete'),
                    onClick: (event, rowData) => this.deleteProjectHandler(rowData)
                } : null),
                {
                    icon: Search,
                    tooltip: Translator.trans('widget.btn.search'),
                    isFreeAction: true,
                    onClick: () => this.state.tableProjectRef.current && this.state.tableProjectRef.current.onQueryChange(),
                }
            ],
            localization: {
                body: {
                    emptyDataSourceMessage: 'Aucune donnée',
                    filterRow: {
                        filterTooltip: 'Cherché'
                    },
                },
                header: {
                    actions: 'Action'
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} sur {count}',
                    labelRowsSelect: 'Lignes',
                    labelRowsPerPage: 'Lignes par page:',
                    firstAriaLabel: 'Première page',
                    firstTooltip: 'Première page',
                    previousAriaLabel: 'Page précédente',
                    previousTooltip: 'Page précédente',
                    nextAriaLabel: 'Page suivante',
                    nextTooltip: 'Page suivante',
                    lastAriaLabel: 'Dernière page',
                    lastTooltip: 'Dernière page'
                },
                toolbar: {
                    searchTooltip: 'Chercher',
                    searchPlaceholder: 'Chercher'
                }
            }
        }
    }

    handleCloseModal = () => {
        this.setState({
            showImportFreelance: false
        });
    };

    render() {
        return (
            <>
                {this.state.showImportFreelance && <ModalUI title={Translator.trans('widget.freelance.grid.integration.action')} open={true} handleModalClose={this.handleCloseModal} child={<IntegreUser/>}/>}
            <div className="col-12 pt-4">
                <div className="card">
                    <div className="card-body p-0">
                        <MaterialTable
                            title={<span><ContactMailIcon/> {Translator.trans('widget.freelance.grid.title')}</span>}
                            tableRef={this.state.tableFreelanceRef}
                            icons={tableIcons}
                            localization={this.state.localization}
                            columns={this.state.columnFreelanceDefs}
                            actions={this.state.actionFreelanceDefs}
                            data={query =>
                                new Promise((resolve, reject) => {
                                    let url = Routing.generate('api_freelance_search')+"?";
                                    url += 'limit=' + query.pageSize;
                                    url += '&page=' + (query.page + 1);
                                    if (query.orderBy) {
                                        url += '&orderByField=' + query.orderBy.field;
                                        url += '&order=' + query.orderDirection;
                                    }
                                    query.filters.map(function(element) {
                                        if (element && element.column) {
                                            if (Array.isArray(element.value)) {
                                                element.value.map(function(val) {
                                                    url += "&" + element.column.field + "[]=" + val;
                                                });
                                            } else {
                                                url += "&" + element.column.field + "=" + element.value;
                                            }
                                        }
                                    });
                                    if (query.search) {
                                        url += '&civility='+query.search;
                                    }
                                    fetch(url)
                                        .then(response => response.json())
                                        .then(result => {
                                            resolve({
                                                data: result.data,
                                                page: result.page - 1,
                                                totalCount: result.itemsCount,
                                            })
                                        })
                                })
                            }
                            options={{
                                filtering: true,
                                actionsColumnIndex: -1
                            }}
                        />
                    </div>
                </div>
                <div className="card my-4">
                    <div className="card-body p-0">
                        <MaterialTable
                            title={<span><BusinessIcon/> {Translator.trans('widget.project.grid.title')}</span>}
                            tableRef={this.state.tableProjectRef}
                            icons={tableIcons}
                            localization={this.state.localization}
                            columns={this.state.columnProjectDefs}
                            actions={this.state.actionProjectDefs}
                            data={query =>
                                new Promise((resolve, reject) => {
                                    let url = Routing.generate('api_project_search')+"?";
                                    url += 'limit=' + query.pageSize;
                                    url += '&page=' + (query.page + 1);
                                    if (query.orderBy) {
                                        url += '&orderByField=' + query.orderBy.field;
                                        url += '&order=' + query.orderDirection;
                                    }
                                    query.filters.map(function(element) {
                                        if (element && element.column) {
                                            if (Array.isArray(element.value)) {
                                                element.value.map(function(val) {
                                                    url += "&" + element.column.field + "[]=" + val;
                                                });
                                            } else {
                                                if (typeof element.value !== 'object') {
                                                    url += "&" + element.column.field + "=" + element.value;
                                                } else {
                                                    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
                                                    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(element.value)
                                                    url += "&" + element.column.field + "[]=" + `${year}-${month}-${day}`;
                                                }
                                            }
                                        }
                                    });
                                    if (query.search) {
                                        url += '&enterprise='+query.search;
                                    }
                                    fetch(url)
                                        .then(response => response.json())
                                        .then(result => {
                                            resolve({
                                                data: result.data,
                                                page: result.page - 1,
                                                totalCount: result.itemsCount,
                                            })
                                        })
                                })
                            }
                            options={{
                                filtering: true,
                                actionsColumnIndex: -1
                            }}
                        />
                    </div>
                </div>
            </div>
            </>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('react'));
