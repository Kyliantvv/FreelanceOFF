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
import '../../scss/Enterprise/enterpriseCurriculum.scss';

Routing.setRoutingData(Routes);

class EnterpriseCurriculum extends Component {
    returnCivility(valeur) {
        let retour = null;

        switch (valeur) {
            case '1':
                retour = Translator.trans('widget.freelance.civility.1');
                break;
            default:
                retour = Translator.trans('widget.freelance.civility.2');
                break;
        }
        return retour;
    }

    deleteCVHandler(rowData) {
        const deleteProfileRoute = Routing.generate('enterprise-curriculum-form-delete.' + document.documentElement.lang, {'resume': rowData.idResume});
        fetch(deleteProfileRoute, {method: 'DELETE'})
            .then(result => {
                this.state.tableCVRef.current && this.state.tableCVRef.current.onQueryChange();
                return result;
            });
    }

    constructor(props) {
        super(props);
        this.state = {
            tableCVRef: React.createRef(),
            columnCVDefs: [
                {
                    title: Translator.trans('widget.enterprise.curriculum.grid.civility'),
                    field: 'civility',
                    render: rowData => <span>{this.returnCivility(rowData.civility)} {rowData.firstName} {rowData.lastName}</span>,
                     filtering: false
                }
                ],
            actionCVDefs: [
                {
                    icon: Visibility,
                    tooltip: Translator.trans('widget.enterprise.curriculum.action.profile'),
                    onClick: (event, rowData) => window.location = Routing.generate('enterprise-curriculum-form-edit.' + document.documentElement.lang, {'resume': rowData.idResume})
                },
                {
                    icon: DeleteOutline,
                    tooltip: Translator.trans('widget.enterprise.curriculum.action.delete'),
                    onClick: (event, rowData) => this.deleteCVHandler(rowData)
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
                    searchPlaceholder: 'Chercher (3 car. min.)'
                }
            }
        }
    }
    render () {

        return (
                <MaterialTable
                    title={<span><ContactMailIcon/> {Translator.trans('widget.enterprise.curriculum.grid.title')}</span>}
                    tableRef={this.state.tableCVRef}
                    icons={tableIcons}
                    localization={this.state.localization}
                    columns={this.state.columnCVDefs}
                    actions={this.state.actionCVDefs}
                    data={query =>
                        new Promise((resolve, reject) => {
                            if (query.search && query.search.length < 3) {
                                resolve({
                                    data: this.state.tableCVRef.current.state.data,
                                    page: this.state.tableCVRef.current.state.currentPage,
                                    totalCount: this.state.tableCVRef.current.state.pageSize,
                                });
                                return;
                            }
                            let url = Routing.generate('api_enterprisecv_search')+ "?";
                            url += 'limit=' + query.pageSize;
                            url += '&page=' + (query.page + 1);
                            if (query.orderBy) {
                                url += '&orderByField=' + query.orderBy.field;
                                url += '&order=' + query.orderDirection;
                            }
                            if (query.search) {
                                url += '&civility=' + query.search;
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
                        filtering: false,
                        actionsColumnIndex: -1
                    }}
                />
        );
    }
}

ReactDOM.render(<EnterpriseCurriculum />, document.getElementById('enterpriseCurriculumWidget'));